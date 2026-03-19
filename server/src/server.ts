import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import express from "express";
import http from "http";
import { resolvers } from "./schema/resolvers";
import cors from "cors";
import { typeDefs } from "./schema/typeDefs";
import { pubsub } from "./pubsub";
import jwt from "jsonwebtoken";
import { prisma } from "./lib/prisma";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.0.144:3000",
      "http://192.168.0.104:3000",
    ],
    credentials: true,
  }),
);

const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

useServer(
  {
    schema,
    context: async (ctx) => {
      const authHeader = (ctx.connectionParams?.Authorization as string) || "";
      const token = authHeader.replace("Bearer ", "");

      let userId = null;
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
          userId = decoded.userId;

          prisma.user
            .update({
              where: { id: userId },
              data: { lastSeen: new Date() },
            })
            .catch((err) => {
              console.warn("Failed to update lastSeen:", err);
            });
        } catch (error) {
          console.warn("Invalid ws token format");
        }
      }

      return { userId, pubsub };
    },
  },
  wsServer,
);

const server = new ApolloServer({ schema });

async function startServer() {
  await server.start();
  app.use(express.json());
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.replace("Bearer ", "");

        let userId = null;
        if (token) {
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
            userId = decoded.userId;

            prisma.user
              .update({
                where: { id: userId },
                data: { lastSeen: new Date() },
              })
              .catch((err) => {
                console.warn("Failed to update lastSeen:", err);
              });
          } catch (err) {
            console.warn("Invalid token format");
          }
        }

        return { req, userId, pubsub };
      },
    }),
  );

  httpServer.listen(
    4000,
    "0.0.0.0", // for Docker compatibility
    () => {
      console.log("HTTP: http://localhost:4000/graphql");
      console.log("WS:   ws://localhost:4000/graphql");
    },
  );
}

startServer().catch((err) => {
  console.log(err);
});

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import express from "express";
import http from "http";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";
import cors from "cors";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

useServer({ schema }, wsServer);

const server = new ApolloServer({ schema });

await server.start();

app.use(express.json());
app.use("/graphql", expressMiddleware(server));

httpServer.listen(4000, () => {
  console.log("HTTP: http://localhost:4000/graphql");
  console.log("WS:   ws://localhost:4000/graphql");
});

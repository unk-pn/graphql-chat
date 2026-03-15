import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";

interface RegisterArgs {
  username: string;
  password: string;
}

export const authResolvers = {
  Mutation: {
    register: async (_: string, { username, password }: RegisterArgs) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

      return { token, user };
    },
    
    login: async (_: string, { username, password }: RegisterArgs) => {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

      return { token, user };
    },
  },
};

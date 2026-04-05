import { prisma } from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { Role } from "@prisma/client";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role?: Role;
}) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || Role.VIEWER,
    },
  });

  const { password, ...safeUser } = user;

  return safeUser;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (user.status === "INACTIVE") {
    throw new Error("User account is inactive");
  }

  const isValid = await comparePassword(data.password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    userId: user.id,
    role: user.role,
  });

  const { password, ...safeUser } = user;

  return { user: safeUser, token };
};
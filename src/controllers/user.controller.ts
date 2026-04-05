import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(200).json({
    message: "Users fetched successfully",
    data: users,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { role, status, name } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(role !== undefined && { role }),
      ...(status !== undefined && { status }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.status(200).json({
    message: "User updated successfully",
    data: updatedUser,
  });
};
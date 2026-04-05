import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (err: any) {
    res.status(401).json({
      message: err.message,
    });
  }
};
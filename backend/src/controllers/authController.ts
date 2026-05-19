import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../services/authService";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await registerUser(req.body?.username, req.body?.password, req.body?.avatar, req.body?.description);
    res.status(201).json({ user, message: "Kontot skapades." });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await loginUser(req.body?.username, req.body?.password);
    res.json({ user, message: "Du är inloggad." });
  } catch (error) {
    next(error);
  }
}

import { Request, Response, NextFunction } from "express";
import { deleteUser, getUserById, getUsers } from "../services/userService";

export async function listUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await getUsers());
  } catch (error) {
    next(error);
  }
}

export async function showUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getUserById(req.params.userId);
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

export async function removeUser(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteUser(req.params.userId, req.body?.userId);
    res.json({ message: "Kontot togs bort." });
  } catch (error) {
    next(error);
  }
}

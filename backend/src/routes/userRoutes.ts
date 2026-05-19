import { Router } from "express";
import { listUsers, removeUser, showUser } from "../controllers/userController";
import { userPostRoutes } from "./postRoutes";

export const userRoutes = Router();

userRoutes.get("/", listUsers);
userRoutes.get("/:userId", showUser);
userRoutes.delete("/:userId", removeUser);
userRoutes.use("/:userId/posts", userPostRoutes);

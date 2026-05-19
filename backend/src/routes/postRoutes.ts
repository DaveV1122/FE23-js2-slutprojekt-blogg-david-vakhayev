import { Router } from "express";
import { createUserPost, likePost, listUserPosts, removePost, updatePost } from "../controllers/postController";

export const postRoutes = Router();

postRoutes.put("/:postId", updatePost);
postRoutes.delete("/:postId", removePost);
postRoutes.post("/:postId/like", likePost);

export const userPostRoutes = Router({ mergeParams: true });

userPostRoutes.get("/", listUserPosts);
userPostRoutes.post("/", createUserPost);

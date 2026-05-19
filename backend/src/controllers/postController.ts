import { Request, Response, NextFunction } from "express";
import { addPost, deletePost, editPost, getUserPosts, togglePostLike } from "../services/postService";

export async function listUserPosts(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await getUserPosts(req.params.userId));
  } catch (error) {
    next(error);
  }
}

export async function createUserPost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await addPost(req.params.userId, req.body?.userId, req.body?.title, req.body?.content);
    res.status(201).json({ post, message: "Inlägget publicerades." });
  } catch (error) {
    next(error);
  }
}

export async function updatePost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await editPost(req.params.postId, req.body?.userId, req.body?.title, req.body?.content);
    res.json({ post, message: "Inlägget uppdaterades." });
  } catch (error) {
    next(error);
  }
}

export async function removePost(req: Request, res: Response, next: NextFunction) {
  try {
    await deletePost(req.params.postId, req.body?.userId);
    res.json({ message: "Inlägget togs bort." });
  } catch (error) {
    next(error);
  }
}

export async function likePost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await togglePostLike(req.params.postId, req.body?.userId);
    res.json({ post, message: "Gilla-markeringen uppdaterades." });
  } catch (error) {
    next(error);
  }
}

export interface User {
  id: string;
  username: string;
  password: string;
  avatar: string;
  description: string;
  createdAt: string;
}

export interface PublicUser {
  id: string;
  username: string;
  avatar: string;
  description: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PostWithAuthor extends Post {
  author: PublicUser | null;
}

export interface Database {
  users: User[];
  posts: Post[];
}

export interface ApiError extends Error {
  status?: number;
  statusCode?: number;
  type?: string;
}

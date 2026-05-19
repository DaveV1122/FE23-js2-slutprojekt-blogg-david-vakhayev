const API_BASE_URL = "http://localhost:3000/api";

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
  author: PublicUser | null;
}

export interface AuthResponse {
  user: PublicUser;
  message: string;
}

export interface UserProfileResponse {
  user: PublicUser;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  const data = (await response.json().catch(() => ({}))) as { message?: string };

  if (!response.ok) {
    throw new Error(data.message ?? "Något gick fel.");
  }

  return data as T;
}

export const api = {
  register(username: string, password: string, avatar: string, description: string) {
    return request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, password, avatar, description })
    });
  },
  login(username: string, password: string) {
    return request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
  },
  getUsers() {
    return request<PublicUser[]>("/users");
  },
  getUser(userId: string) {
    return request<UserProfileResponse>(`/users/${userId}`);
  },
  deleteUser(userId: string) {
    return request<{ message: string }>(`/users/${userId}`, {
      method: "DELETE",
      body: JSON.stringify({ userId })
    });
  },
  getUserPosts(userId: string) {
    return request<Post[]>(`/users/${userId}/posts`);
  },
  addPost(userId: string, title: string, content: string) {
    return request<{ post: Post; message: string }>(`/users/${userId}/posts`, {
      method: "POST",
      body: JSON.stringify({ userId, title, content })
    });
  },
  editPost(postId: string, userId: string, title: string, content: string) {
    return request<{ post: Post; message: string }>(`/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ userId, title, content })
    });
  },
  deletePost(postId: string, userId: string) {
    return request<{ message: string }>(`/posts/${postId}`, {
      method: "DELETE",
      body: JSON.stringify({ userId })
    });
  },
  likePost(postId: string, userId: string) {
    return request<{ post: Post; message: string }>(`/posts/${postId}/like`, {
      method: "POST",
      body: JSON.stringify({ userId })
    });
  }
};

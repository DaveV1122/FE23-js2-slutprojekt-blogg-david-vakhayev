export const avatarOptions = ["avatar1.png", "avatar2.png", "avatar3.png"] as const;

const avatarUrls: Record<string, string> = {
  "avatar1.png": new URL("../assets/avatars/avatar1.png", import.meta.url).toString(),
  "avatar2.png": new URL("../assets/avatars/avatar2.png", import.meta.url).toString(),
  "avatar3.png": new URL("../assets/avatars/avatar3.png", import.meta.url).toString()
};

export function getAvatarUrl(avatar: string): string {
  return avatarUrls[avatar] ?? avatarUrls["avatar1.png"];
}

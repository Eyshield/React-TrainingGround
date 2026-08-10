export type Role = "admin" | "viewer" | "Manager";

export interface User {
  id?: string;
  email: string;
  password?: string;
  username?: string;
  role?: Role;
}

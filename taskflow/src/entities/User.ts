export type Role = "Admin" | "User" | "Manager";

export interface User {
  id?: string;
  email: string;
  password: string;
  username?: string;
  role?: Role;
}

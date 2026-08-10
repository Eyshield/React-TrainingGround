import type { Role } from "./User";

export interface UserResponse {
  id?: string;
  email: string;
  role?: Role;
  username?: string;
}

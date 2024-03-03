import { Role } from "./auth.types";

export interface GlobalState {
  isAuth?: boolean;
  username?: string;
  role?: Role;
  balance?: number;
}

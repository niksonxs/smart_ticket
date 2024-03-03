import { Role } from "./auth.types";
import { Ticket } from "./ticket.type";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  role: Role;
  role_id: number;
  refresh_token: string;
  tickets: Ticket[];
  balance: number;
}

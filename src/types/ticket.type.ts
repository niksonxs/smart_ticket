import { User } from "./user.type";

export interface Ticket {
  id: number;
  price: number;
  purchaseDate: Date;
  expirationDate: Date;
  isUsed: boolean;
  validationCode: string;
  validatedBy: User;
  user: User;
}

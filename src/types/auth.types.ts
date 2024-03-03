export interface Role {
  id: number;
  name: string;
}

export interface AuthenticationContext {
  username: string;
  role: Role;
  balance: number;
}

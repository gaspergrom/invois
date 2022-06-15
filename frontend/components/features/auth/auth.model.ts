export interface AuthLoginData {
  email: string;
  password: string;
}

export interface AuthRegisterData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface User {
  name: string;
  lastName: string;
  email: string;
  profilePhoto?: string;
}

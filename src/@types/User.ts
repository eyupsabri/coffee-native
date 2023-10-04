export type UserLogin = {
  username: string;
  password: string;
}

export type AuthState = {
  token: string;
  authenticated: boolean;
}


export type AuthContextType = {
  authState: AuthState | null;
  register:(user: UserLogin) => void;
  //setAuthStateHelper: (authToken: string) => void;
}


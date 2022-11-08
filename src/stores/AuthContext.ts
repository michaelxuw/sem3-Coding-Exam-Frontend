import { createContext, Dispatch, SetStateAction } from 'react';

interface AuthContextProps {
  loggedIn?: boolean,
  setLoggedIn?: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps>({});


export default AuthContext;
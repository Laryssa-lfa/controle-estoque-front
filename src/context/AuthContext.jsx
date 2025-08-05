import { createContext, useContext, useEffect, useState } from "react";
import { firebaseLogin, firebaseLogout, firebaseObserveUser } from "../firebase/auth";

const AuthContext = createContext();

function AuthProvider(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function login(email, senha) {
    await firebaseLogin(email, senha);
    setIsAuthenticated(true);
  }

  async function logout() {
    await firebaseLogout();
    setIsAuthenticated(false);
  }

  useEffect(() => {
    const unsubscribe = firebaseObserveUser((user) => {
      user ? setIsAuthenticated(true) : setIsAuthenticated(false)
      setIsLoading(false);
    });

    return () => { unsubscribe() };
  }, []);

  if (isLoading) {
    return <div className="p-5">Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };

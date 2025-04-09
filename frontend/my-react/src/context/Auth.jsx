import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: ""
  });

  useEffect(()=>{
   const data = localStorage.getItem('auth')
     if (data) {
      const perseData = JSON.parse(data)
      setAuth({...auth, user:perseData.user, token:perseData.token})
     }
  },[])

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

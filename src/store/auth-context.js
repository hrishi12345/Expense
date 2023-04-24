import React, { useState } from "react";

export const AuthContext = React.createContext({
  token: "",
  isLogin: false,
  fullName: "",
  verify:false,
  login: (token, fullName) => {},
  logout: () => {}
});

function AuthContextProvider(props) {
  const initialToken = localStorage.getItem("token");
  const initialFullName = localStorage.getItem("fullName");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const [fullName, setFullName] = useState(initialFullName);

  const loginHandler = (token, fullName) => {
    localStorage.setItem("token", token);
    localStorage.setItem("fullName", fullName);
    setToken(token);
    setFullName(fullName);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    setToken(null);
    setFullName(null);
  };

  const authContext = {
    token: token,
    isLogin: userIsLoggedIn,
    fullName: fullName,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

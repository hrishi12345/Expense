import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import { useContext } from "react";
import { AuthContext } from "./store/auth-context";


function App() {
  const Auth=useContext(AuthContext)
  return (
    <Routes>
     {Auth.isLogin && <Route path="/" element={<Home />}></Route>}
      {!Auth.isLogin && <Route path="/login" element={<LoginForm />} />}
      {!Auth.isLogin && <Route path="*" element={<LoginForm />} />}
      </Routes>
  );
}

export default App;

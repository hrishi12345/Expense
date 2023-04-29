import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import { useSelector } from "react-redux";

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <Routes>
      {isLogin && <Route path="/" element={<Home />} />}
      {!isLogin && <Route path="/login" element={<LoginForm />} />}
      {isLogin && <Route path="/profile" element={<Profile />} />}
      {!isLogin && <Route path="*" element={<LoginForm />} />}
      {isLogin && <Route path="/login" element={<Home />} />} 
    </Routes>
  );
}

export default App;

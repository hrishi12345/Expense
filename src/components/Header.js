import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Header.css'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store";


function Header() {
  const log = useSelector(state => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const sub = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCR1tfldY3tGoHgIHRJFEULd1C5XYv8kKQ`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: log.token,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();
        if (data.users.length > 0) {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [log.token, log.fullName]);

  const verifyHandler = () => {
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCR1tfldY3tGoHgIHRJFEULd1C5XYv8kKQ", {
      method: "POST",
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: log.token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not send verification email.");
        }
        alert("Verification email sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert("Error sending verification email.");
      });
  };
  
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth");
    localStorage.removeItem("data");
    localStorage.removeItem("token"); // Remove the token item from local storage
    navigate('/login'); // Redirect to login page after logout
  };
  

  return (
    <header>
      <span>Expense Tracker</span>
      <span>Home</span>
      <span>Products</span>
      <span>About Us</span>
      {log.isLogin && (
        <button onClick={sub}>Please complete your profile</button>
      )}
      {log.isLogin && !log.verify && (
        <button onClick={verifyHandler}>Verify Email</button>
      )}
      {log.isLogin && <button onClick={handleLogout}>Logout</button>}
    </header>
  );
}

export default Header;

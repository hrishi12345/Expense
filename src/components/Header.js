
import { useContext, useEffect } from "react";
import { AuthContext } from "../store/auth-context";
import { useNavigate } from "react-router-dom";

function Header() {
  const log = useContext(AuthContext);
  const navigate = useNavigate();

  const sub = () => {
    navigate("/profile");
  };

  const logout = () => {
    log.logout();
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
      {log.isLogin && <button onClick={logout}>Logout</button>}
      <span>Full name: {log.fullName}</span>
    </header>
  );
}

export default Header;

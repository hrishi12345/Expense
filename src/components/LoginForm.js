import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./LoginForm.module.css";
import Forgot from "./ForogotPassword";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../store";

const AuthForm = () => {
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const dispatch = useDispatch();

  const switchAuthModeHandler = () => {
    setIsLoad((prevstate) => !prevstate);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmailValue = enteredEmail.current.value;
    const enteredPasswordValue = enteredPassword.current.value;
    setIsLoading(true);

    let url;
    if (!isLoad) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCR1tfldY3tGoHgIHRJFEULd1C5XYv8kKQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCR1tfldY3tGoHgIHRJFEULd1C5XYv8kKQ";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmailValue,
          password: enteredPasswordValue,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (!response.ok) {
        throw new Error("Authentication failed!");
      }
      const data = await response.json();
      if (isLoad) {
        dispatch(login({ token: data.idToken, fullName: data.fullName }));
      } else {
        dispatch(signup({ token: data.idToken, fullName: data.fullName }));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  return (
    <section className={classes.auth}>
      <h1>{!isLoad ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={enteredEmail} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={enteredPassword} />
        </div>
        <Forgot />
        <div className={classes.actions}>
          {!isLoading && (
            <button type="submit">
              {!isLoad ? "Login" : "Create Account"}
            </button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {!isLoad ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

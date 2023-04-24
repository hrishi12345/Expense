import { useContext, useRef } from "react";
import { AuthContext } from "../store/auth-context";

export default function Profile() {
  const fullName = useRef();
  const imageUrl = useRef();
  const token = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const full = fullName.current.value;
    const ima = imageUrl.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCR1tfldY3tGoHgIHRJFEULd1C5XYv8kKQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token.token,
          displayName: full,
          photoUrl: ima,
          returnSecureToken: true
        })
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        token.fullName = data.displayName;
      })
      .catch((err) => alert(err));
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="full">Full name</label>
      <input id="full" ref={fullName} />
      <label htmlFor="image">Image url</label>
      <input id="image" ref={imageUrl} />
      <button type="submit">Update</button>
    </form>
  );
}

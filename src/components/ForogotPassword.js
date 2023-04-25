import {useRef, useState } from "react"
// import { AuthContext } from "../store/auth-context"

export default function Forgot() {
  const [showInputBox, setShowInputBox] = useState(false);
  const emailRef = useRef();
//   const auth = useContext(AuthContext);

  const forgotPasswordHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCR1tfldY3tGoHgIHRJFEULd1C5XYv8kKQ',
    {method:'POST',
      body:JSON.stringify({
        requestType:"PASSWORD_RESET",
        email:email
      })
    }).then((res)=>{
        if(res.ok){
            alert('Please check your mail')
        }else{
            alert('Failed')
        }
    })
    // TODO: implement forgot password functionality
  }

  const toggleInputBoxHandler = () => {
    setShowInputBox(prevState => !prevState);
  }

  return (
    <div>
      <button onClick={toggleInputBoxHandler}>Forgot Password</button>
      {showInputBox && (
        <form onSubmit={forgotPasswordHandler}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" ref={emailRef} />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  )
}

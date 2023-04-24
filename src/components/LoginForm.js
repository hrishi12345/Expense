import React,{ useContext, useRef, useState } from "react"
import { AuthContext } from "../store/auth-context"
import { useNavigate } from "react-router-dom";
import classes from './LoginForm.module.css'
const AuthForm = () => {
    const enteredemail=useRef()
    // const navigate=useNavigate()
    const eneredPass=useRef()
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading,setisLoading]=useState(false)
    const contextAtx=useContext(AuthContext)
  
    const switchAuthModeHandler = () => {
      setIsLogin((prevState) => !prevState);
    };
    const onSubmithandler=(event)=>{
      event.preventDefault()
      const enteremail=enteredemail.current.value
      const enterpass=eneredPass.current.value
      setisLoading(true)
      let url
      if(isLogin){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCR1tfldY3tGoHgIHRJFEULd1C5XYv8kKQ'
            
      }else{
        url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCR1tfldY3tGoHgIHRJFEULd1C5XYv8kKQ'
      }
        fetch(url,{
          method:'POST',
          body:JSON.stringify({
            email:enteremail
            , password:enterpass,
            returnSecureToken:true
  
          }),
          headers:{
            'Content-Type':'application/json'
          }
  
  
        }).then((res)=>{
          setisLoading(false)
          if(res.ok){
                return res.json()
          }else{
            
            return res.json().then((data)=>{
              
             let errorMessage='Authentication Failed'
             throw new Error(errorMessage)
  
        
            })
          }
        }).then((data)=>{
          contextAtx.login(data.idToken)
        //   navigate('/')
        }).catch((err)=>
          alert(err)
        )
      }
    
    return (
      <React.Fragment>
    
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={onSubmithandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required ref={enteredemail}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input type='password' id='password' required ref={eneredPass}/>
          </div>
          <div className={classes.actions}>
            {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
            {isLoading && <p>Data is fetching</p>}
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
      </React.Fragment>
    );
  };
export default AuthForm  
import React,{ useState } from "react";

export const AuthContext=React.createContext({token:'',
isLogin:false,
login:(token)=>{},
logout:()=>{}})
function AuthContextProvider(props){
    const initialToken=localStorage.getItem('token')
    const [token,setToken]=useState(initialToken)
    const userisLoggin=!!token
    
    const loginHandler=(token)=>{
        localStorage.setItem('token',token)
           setToken(token)
    }
    const logoutHandler=()=>{
        localStorage.removeItem('token')
        setToken(null)
    }
    const cnContext={
        token:token,
        isLogin:userisLoggin,
        login:loginHandler,
        logout:logoutHandler
    }
    return(
        <AuthContext.Provider value={cnContext}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider
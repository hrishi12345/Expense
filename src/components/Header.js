import { useContext } from "react"
import { AuthContext } from "../store/auth-context"
import { useNavigate } from "react-router-dom"
function Header(){
    const log=useContext(AuthContext)
    const navigate=useNavigate()
    const sub=()=>{
        navigate('/profile')
    }
    return(
        
        <header>
            <span>Expense Tracker</span>
            <span>Home</span>
            <span>Products</span>
            <span>About Us</span>
            {log.isLogin && <button onClick={sub}>Please complete your profile</button>}
            <span>Full name:{log.fullName}</span>
        </header>
    )
}
export default Header
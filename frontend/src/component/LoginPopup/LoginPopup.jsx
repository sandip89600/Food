import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
const LoginPopup = ({ setShowLogin }) => {

        const {url,setToken} =useContext(StoreContext)

    const [currstate, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password:""
    })

    const onChangehandler = (event) => {
        const name = event.target.name;
        const value = event.target.value; 
        setData(data=>({...data,[name]:value}))
    } 

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currstate === "Login") {
         newUrl += "/api/user/login";  
        }
        else {
         newUrl += "/api/user/register";  
            
        }
        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
            alert("Your Food Is Waiting For You 🤤");
        } else {
            alert(response.data.message)
        }

    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currstate}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-input">
                    {currstate === "Login" ? <></> : <input name='name' onChange={onChangehandler} value={data.name} type="text" placeholder='Your name' required />}
                    <input name='email' onChange={onChangehandler} value={data.email} type="email" placeholder='Your Email' required />
                    <input name='password' onChange={onChangehandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{currstate === "Sign up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree term of use & privacy policy</p>
                </div>
                {currstate === "Login"
                    ? <p>Create new account <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>
                    : <p>Already have an account <span onClick={()=>setCurrState("Login")}>Click here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup

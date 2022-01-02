import React from "react";
import Google from "./google";
import Facebook from "./facebook";
import './login.css'

const Login=({setUser,setUserDetails})=>{
  return(
    <div className="Login">
      <h1>Choose a Login Method</h1>
      <div className="login-method">
        <Google setUser={setUser} setUserDetails={setUserDetails} />
        <Facebook setUser={setUser} setUserDetails={setUserDetails}/>
      </div>
    </div>
  )
}

export default Login;
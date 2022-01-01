import React from "react";
import Google from "./google";
import Facebook from "./facebook";
import './login.css'

const Login=()=>{
  return(
    <div className="Login">
      <h1>Choose a Login Method</h1>
      <div className="login-method">
        <Google/>
        <Facebook/>
      </div>
    </div>
  )
}

export default Login;
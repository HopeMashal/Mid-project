import React from "react";
import FacebookLogin from 'react-facebook-login';
import './login.css'

const Facebook=({setUser,setUserDetails})=>{
  const responseFacebook = (response) => {
    console.log(response);
    setUser(true);
  }
  return(
    <div className="Login">
      <FacebookLogin
        appId="1069194787205073"
        fields="name,email,picture"
        cssClass="facebook-button"
        callback={responseFacebook}
        icon="fa-facebook" 
      />
    </div>
  )
}

export default Facebook;
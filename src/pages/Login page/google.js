import React from "react";
import GoogleLogin from 'react-google-login';

const Google=({setUser,setUserDetails})=>{
  const clientId = "186933503800-vgamtoooh639lpn3q5novi96caab9gtg.apps.googleusercontent.com";
  const onLoginSuccess = (res) => {
    console.log('Login Success:', res.profileObj);
  };
  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };
  return(
    <div className="Login">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}

export default Google;
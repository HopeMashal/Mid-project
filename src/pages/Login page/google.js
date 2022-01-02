import React from "react";
import GoogleLogin from 'react-google-login';
import fetchData from '../../api/fetchdata';
import api from "../../api/api";

const Google=({setUser,setUserDetails})=>{
  const clientId = "186933503800-vgamtoooh639lpn3q5novi96caab9gtg.apps.googleusercontent.com";
  const onLoginSuccess = async (res) => {
    console.log('Login Success:', res.profileObj);
    const userid=res.profileObj.googleId;
    const username=res.profileObj.givenName;
    const userLname=res.profileObj.familyName;
    const userimage=res.profileObj.imageUrl;
    const data = await fetchData();
    const match = data.find(
      (player) => player.userID === userid
    );
    if (match){
      setUser(true);
      setUserDetails({
        userID: match.userID,
        name: match.name,
        avatar: match.avatar,
        Completed:match.Completed,
        Uncompleted:match.Uncompleted,
        createdAt:match.createdAt,
        NOuser:'Welcome Back: '
      });
    } else {
      setUser(true);
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      await api.post('/', {
        userID:userid,
        name:`${username} ${userLname}`,
        avatar: userimage,
        Completed:0,
        Uncompleted:0,
        createdAt:date,
      });
      setUserDetails({ 
        userID:userid,
        name:`${username} ${userLname}`,
        avatar:userimage,
        Completed:0,
        Uncompleted:0,
        createdAt:date,
        NOuser:'Welcome: '
      });
    }
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
    setUser(false);
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
import React from "react";
import FacebookLogin from 'react-facebook-login';
import './login.css'
import fetchData from '../../api/fetchdata';
import api from "../../api/api";

const Facebook=({setUser,setUserDetails})=>{
  const responseFacebook = async (response) => {
    console.log(response);
    const userid=response.userID;
    const username=response.name;
    const userimage=response.picture.data.url;
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
        name:username,
        avatar: userimage,
        Completed:0,
        Uncompleted:0,
        createdAt:date,
      });
      setUserDetails({ 
        userID:userid,
        name:username,
        avatar:userimage,
        Completed:0,
        Uncompleted:0,
        createdAt:date,
        NOuser:'Welcome: '
      });
    }
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
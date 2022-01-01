import './App.css';
import React from 'react';
import {HashRouter,Route} from 'react-router-dom';
import { useEffect, useState } from "react";
import Header from './components/navbar/navbar';
import HomePage from './pages/Home page/home';
import Login from './pages/Login page/login';
import ProfilePage from './pages/Profile page/profile';
import ResultsPage from './pages/Results page/results';
import GamePage from './pages/Game page/game';

function App() {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    console.log('Hello');
    setUser(false);
  })
  return (
    <div>
      <HashRouter>
        <Header user={user}/>
        <Route path="/" exact component={HomePage}/>
        <Route path="/login" exact component={Login}/> 
        <Route path="/profile" exact component={ProfilePage}/> 
        <Route path="/results" exact component={ResultsPage}/> 
        <Route path="/game" exact component={GamePage} />
      </HashRouter>
    </div>
  );
}

export default App;

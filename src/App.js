import React,{ useState } from 'react';
import {HashRouter,Route,Redirect } from 'react-router-dom';
import Header from './components/navbar/navbar';
import HomePage from './pages/Home page/home';
import Login from './pages/Login page/login';
import ProfilePage from './pages/Profile page/profile';
import ResultsPage from './pages/Results page/results';
import GamePage from './pages/Game page/game';

function App() {
  const [user, setUser] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  return (
    <div>
      <HashRouter>
        <Header user={user} setUser={setUser}/>
        <Route path="/" exact component={HomePage}/>
        <Route path="/login" exact> 
          {
            user?(
              <Redirect to="/profile" />
            ):(
              <Login 
                setUser={setUser} 
                setUserDetails={setUserDetails}
              />
            )
          }
        </Route>
        <Route path="/profile" exact>
          {
            user?(
              <ProfilePage
                userDetails={userDetails}
              />
            ):(
              <Redirect to="/login" />
            )
          }
        </Route> 
        <Route path="/results" exact> 
          {
            user?(
              <ResultsPage />
            ):(
              <Redirect to="/login" />
            )
          }
        </Route>
        <Route path="/game" exact>
          {
            user?(
              <GamePage
                userDetails={userDetails}
                setUserDetails={setUserDetails} 
              />
            ):(
              <Redirect to="/login" />
            )
          }
        </Route>
      </HashRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import BottomNav from './Components/BottomNav/BottomNav';
import SignInOrSignUp from './Components/Auth/SignInOrSignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import Search from './Components/Dashboard/Search';
import Account from './Components/Account/Account';
import Profile from './Components/Account/Profile';
import Settings from './Components/Account/Settings';
import './App.css';



function App() {
  return (
    <div className="App" style={{background:"black", minHeight:"100vh"}}>
      <Route exact path="/login" component={SignInOrSignUp}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/search" component={Search}/>
      <Route exact path="/account" component={Account}/>
      <Route exact path="/settings" component={Settings}/>
      <Route exact path="/user/:username" component={Profile}/>
      <BottomNav/>
    </div>
  );
}

export default App;

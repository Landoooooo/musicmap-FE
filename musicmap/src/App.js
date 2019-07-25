import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import SignInOrSignUp from './Components/Auth/SignInOrSignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import Search from './Components/Dashboard/Search';
import Account from './Components/Account/Account';
import Profile from './Components/Account/Profile';
import Settings from './Components/Account/Settings';
import './App.css';



function App() {
  return (
    <div className="App">
      <Route exact path="/login" component={SignInOrSignUp}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/search" component={Search}/>
      <Route path="/account" component={Account}/>
      <Route path="/settings" component={Settings}/>
      <Route exact path="/:username" component={Profile}/>
    </div>
  );
}

export default App;

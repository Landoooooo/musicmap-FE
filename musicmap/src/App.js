import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import SignInOrSignUp from './Components/Auth/SignInOrSignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import './App.css';


function App() {
  return (
    <div className="App">
      <Route exact path="/login" component={SignInOrSignUp}/>
      <Route path="/dashboard" component={Dashboard}/>
    </div>
  );
}

export default App;

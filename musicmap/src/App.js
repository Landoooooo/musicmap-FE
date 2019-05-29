import React from 'react';
import SignInOrSignUp from './Components/Auth/SignInOrSignUp';
import './App.css';
require('dotenv').config()

function App() {
  return (
    <div className="App">
      <div>
        <h1>Welcome to MusicMap!</h1>
      </div>
      <SignInOrSignUp/>
    </div>
  );
}

export default App;

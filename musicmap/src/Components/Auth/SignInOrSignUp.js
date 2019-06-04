import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import { GoogleLogin } from 'react-google-login'

class SignInOrSignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    onSuccess = googleUser => {
        console.log(googleUser)
        if(googleUser){
            this.props.history.push('/dashboard')
        }
    }

    render(){
        return(
            <div>
                <div>
                    <h1>Welcome to MusicMap!</h1>
                </div>
                <div>
                    <GoogleLogin
                        clientId="643322048982-cfbe4no6h68gl7fhibso71oo7lvafcui.apps.googleusercontent.com"
                        onSuccess={this.onSuccess}
                    />
                </div>
            </div>
        );
    }
}

export default SignInOrSignUp;
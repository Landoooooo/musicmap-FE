import React from 'react';
import { GoogleLogin } from 'react-google-login'

class SignInOrSignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    onSuccess = googleUser => {
        console.log(googleUser)
    }

    render(){
        return(
            <div>
                <h2>Login</h2>
                <div>
                    <GoogleLogin
                        clientId="643322048982-cfbe4no6h68gl7fhibso71oo7lvafcui.apps.googleusercontent.com"
                        onSuccess={this.onSuccess}
                        onFailure={this.onSuccess}
                    />
                </div>
            </div>
        );
    }
}

export default SignInOrSignUp;
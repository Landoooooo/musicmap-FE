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
                <h2>SignUp</h2>

                <div>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                        onSuccess={this.onSuccess}
                        onFailure={this.onSuccess}
                    />
                </div>
            </div>
        );
    }
}

export default SignInOrSignUp;
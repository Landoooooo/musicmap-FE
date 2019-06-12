import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            username: "",
            location: "",
            type: "",
            profile_photo: ""
        }
    }

    bundleUserInfo = e => {
        e.preventDefault()
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            location: this.state.location,
            type: this.state.type
        }

        this.props.addUser(user)
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })

        this.props.handleChange(e.target.name, e.target.value)
    }
    render(){
        return (
            <div>
                {this.props.addUser ? (
                    <div>
                        <h1>Sign Up</h1>
                        <form onSubmit={this.bundleUserInfo}>
                            <TextField
                            id="email"
                            name="email"
                            label="email"
                            value={this.state.email}
                            margin="dense"
                            onChange={this.handleChange}
                            />
                            <TextField
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                value={this.state.firstName}
                                margin="dense"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                value={this.state.lastName}
                                margin="dense"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="username"
                                name="username"
                                label="username"
                                value={this.state.username}
                                margin="dense"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="location"
                                name="location"
                                label="Location"
                                value={this.state.location}
                                margin="dense"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="type"
                                name="type"
                                label="type"
                                value={this.state.type}
                                margin="dense"
                                onChange={this.handleChange}
                            />
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </form>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}

            </div>
        )
    }

}

export default LoginForm;

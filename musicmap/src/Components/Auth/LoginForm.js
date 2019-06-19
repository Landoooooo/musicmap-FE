import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import moment from "moment";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import axios from "axios";
import ApolloClient from 'apollo-boost';


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

    uploadToS3 = async (file, signedRequest) => {
        const options = {
          headers: {
            "Content-Type": file.type
          }
        };
        await axios.put(signedRequest, file, options);
    };

    formatFilename = filename => {
        const date = moment().format("YYYYMMDD");
        const randomString = Math.random()
          .toString(36)
          .substring(2, 7);
        const cleanFileName = filename.toString().toLowerCase().replace(/[^a-z0-9]/g, "-");
        const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
        return newFilename.substring(0, 60);
    };

    bundleUserInfo = e => {
        e.preventDefault()
        const { profile_photo } = this.state;

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            location: this.state.location,
            type: this.state.type,
            profile_photo: this.state.profile_photo.path
        }

        const client = new ApolloClient({
            uri: "http://localhost:4000"
        })

        client.mutate({
            mutation: s3Sign,
            variables: {
                filename: this.formatFilename(profile_photo),
                filetype: profile_photo.type
            }
        }).then( response => {
            console.log(response)
            const { signedRequest, url } = response.data.signS3;

            this.setState({
                profile_photo: url
            })

            this.uploadToS3(profile_photo, signedRequest)
            
        }).catch( err => console.log(err))

        this.props.addUser(user)
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })

        this.props.handleChange(e.target.name, e.target.value)
    }

    onDrop = async file => {
        this.setState({
            profile_photo: file[0]
        });
    }
    render(){
        return (
            <div>
                {this.props.addUser ? (
                    <div>
                        <h1>Sign Up</h1>
                        <form onSubmit={this.bundleUserInfo}>

                            <Dropzone onDrop={this.onDrop}>
                                {({getRootProps, getInputProps}) => (
                                <section className="container">
                                    <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <p>Upload profile photo</p>
                                    </div>
                                </section>
                                )}
                            </Dropzone>
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

const s3Sign = gql`
    mutation($filename: String!, $filetype: String!){
        signS3(filename: $filename, filetype: $filetype){
            signedRequest
            url
        }
    }
`

export default graphql(s3Sign)(LoginForm);

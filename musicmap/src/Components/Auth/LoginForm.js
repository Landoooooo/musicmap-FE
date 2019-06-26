import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import moment from "moment";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import axios from "axios";
import ApolloClient from 'apollo-boost';
// Import Search Bar Components
import SearchBar from 'material-ui-search-bar';

//Import React Scrit Libraray to load Google object
import Script from 'react-load-script';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            username: "",
            location: "",
            query: "",
            type: "",
            profile_photo: ""
        }
    }

    handleScriptLoad() {
        // Declare Options For Autocomplete
        const options = { types: ['(cities)'] };

        // Initialize Google Autocomplete
        /*global google*/
        const autocomplete = new google.maps.places.Autocomplete(
                              document.getElementById("autocomplete"),
                              options );
        // Fire Event when a suggested name is selected
        autocomplete.addListener('place_changed', this.handlePlaceSelect);
    }

    handlePlaceSelect() {

        const options = { types: ['(cities)'] };

        const autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            options );

        // Extract City From Address Object
        let addressObject = autocomplete.getPlace();
        let address = addressObject.address_components;

        // Check if address is valid
        if (address) {
            // Set State
            this.setState(
            {
                location: address[0].long_name,
                query: addressObject.formatted_address,
            }
            );
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
                <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyByD3q3i9ev2A_Tak9hIXNrnT-39f_pop4&libraries=places"
                onLoad={this.handleScriptLoad}
                />
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
                            <MuiThemeProvider>
                                <SearchBar id="autocomplete" placeholder="" hintText="Search City" value={this.state.query}
                                    style={{
                                        margin: '0 auto',
                                        maxWidth: 800,
                                    }}
                                />
                            </MuiThemeProvider>

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

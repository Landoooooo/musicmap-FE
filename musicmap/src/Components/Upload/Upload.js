import React from 'react';
import styled from "styled-components";
import Dropzone from 'react-dropzone';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import axios from "axios";
import moment from "moment";
import ApolloClient from 'apollo-boost';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const UploadForm = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items: center;
    padding:20px;
    height:50%;
    width:75%;
    background:red;
`;

class Upload extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user_id: "",
            text: "",
            photo: "",
            video: "",
            audio: ""
        }
    }

    onDrop = async file => {
        const fileType = file[0].type;
        console.log(fileType)

        switch(fileType){
            case "image/jpeg":
                this.setState({
                    photo: file[0]
                })
                break;
            case "audio/mp3":
                this.setState({
                    audio: file[0]
                })
                break;
            case "video/mp3":
                this.setState({
                    video: file[0]
                })
                break;
            default:
                console.log("testing switch")
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
        const { photo, audio, video } = this.state;

        const statusType = {
            photo,
            audio,
            video
        }

        const keys = Object.keys(statusType);

        const checkStatus = keys.filter(function(key) {
            return statusType[key]
        });

        const state = checkStatus[0];

        const client = new ApolloClient({
            uri: "http://localhost:4000"
        })

        client.mutate({
            mutation: s3Sign,
            variables: {
                filename: this.formatFilename(state),
                filetype: (state.type)
            }
        }).then( response => {
            console.log(response)
            const { signedRequest, url } = response.data.signS3;


            this.setState({
                state: url
            })

            this.uploadToS3(state, signedRequest)

        }).catch( err => console.log(err))

        this.props.addUser(user)
    };

    render(){
        return(
            <UploadForm>
                <h2>New Drop!</h2>
                <form onSubmit={() => console.log("test")}>
                    <TextField
                        id="text"
                        name="text"
                        value={this.state.value}
                        margin="dense"
                    />
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
                    <Button variant="contained" color="primary" type="submit">
                        Upload
                    </Button>
                </form>
            </UploadForm>
        )
    }
}

const newStatus = gql`
    mutation($input: StatusInput!){
        newStatus(input: $input){
            id
            user_id
            text
            photo
            video
            audio
        }
    }
`;

const s3Sign = gql`
    mutation($filename: String!, $filetype: String!){
        signS3(filename: $filename, filetype: $filetype){
            signedRequest
            url
        }
    }
`

export default graphql(s3Sign)(Upload);
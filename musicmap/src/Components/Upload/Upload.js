import React from 'react';
import styled from "styled-components";
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
            value: ""
        }
    }

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
                    <TextField
                      id="upload"
                      name="photo"
                      value="photo"
                      margin="dense"
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Upload
                    </Button>
                </form>
            </UploadForm>
        )
    }
}

export default Upload;
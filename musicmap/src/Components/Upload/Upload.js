import React from 'react';
import TextField from '@material-ui/core/TextField';

class Upload extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: ""
        }
    }

    render(){
        return(
            <div>
                <form>
                    <TextField
                        id="text"
                        name="text"
                        value={this.state.value}
                        margin="dense"
                    />
                </form>
            </div>
        )
    }
}

export default Upload;
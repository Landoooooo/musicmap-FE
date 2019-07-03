import React from 'react';
import TextField from '@material-ui/core/TextField';
class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: ""
        }
    }

    render(){
        return(
            <div>
                <TextField
                    id=""
                    name=""
                    value="Some setting"
                />
            </div>
        )
    }
}

export default Settings;
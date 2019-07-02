import React from 'react';
import TextField from '@material-ui/core/TextField';

const Upload = () => (
    <div>
        <form>
            <TextField
                id="text"
                name="text"
                value="Talk that talk!"
                margin="dense"
            />
        </form>
    </div>
)

export default Upload;
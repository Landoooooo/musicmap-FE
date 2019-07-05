import React from 'react';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import styled from "styled-components";
import Upload from '../Upload/Upload';
import { NavLink } from "react-router-dom";


class BottomNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            upload: false
        }
    }

    openUpload = () => {
        this.setState({
            upload: true
        })
    }

    closeUpload = () => {
        this.setState({
            upload: !this.state.upload
        })
    }

    render(){
        return(
            <div>
                <div onClick={() => this.openUpload()}>
                    <p>Upload</p>
                    { this.state.upload &&
                        <Modal
                            open={this.state.upload}
                            onClose={() => this.closeUpload}
                        >
                            <DialogContent style={{display:"flex", height:"100%", justifyContent:"center", alignItems:"center"}}>
                                <Upload/>
                            </DialogContent>
                        </Modal>
                    }
                </div>
                <NavLink to="/search">
                    Search
                </NavLink>
                <NavLink to="/dashboard">
                    Feed
                </NavLink>
                <NavLink to="/account">
                    Account
                </NavLink>
            </div>
        )
    }
}

export default BottomNav;
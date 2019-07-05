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
        console.log(this.state.upload)
    }

    closeUpload = () => {
        console.log(this.state.upload)
        this.setState({
            upload: false
        })
    }

    render(){
        return(
            <div>
                <div>
                    <p onClick={this.openUpload}>Upload</p>
                </div>
                <Modal
                    aria-labelledby="simple-modal-upload"
                    aria-describedby="simple-modal-newStatus"
                    open={this.state.upload}
                    onClose={this.closeUpload}
                    style={{display:"flex", height:"100%", justifyContent:"center", alignItems:"center"}}
                >
                    <Upload/>

                </Modal>
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
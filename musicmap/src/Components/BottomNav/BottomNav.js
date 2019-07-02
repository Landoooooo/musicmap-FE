import React from 'react';
import Modal from '@material-ui/core/Modal';
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
            upload: !this.state.upload
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
                        >
                            <Upload/>
                        </Modal>
                    }
                </div>
                <NavLink to="/search">
                    Search
                </NavLink>
                <NavLink to="/dashboard">
                    Feed
                </NavLink>
            </div>
        )
    }
}

export default BottomNav;
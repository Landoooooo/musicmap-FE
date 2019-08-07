import React from 'react';
import Modal from '@material-ui/core/Modal';
import Upload from '../Upload/Upload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const StyledLink = styled(NavLink)`
    text-decoration: none;
    color:red;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const BottomNavContainer = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    bottom: 0;
    position:fixed;
    margin-bottom:10px;
    width:100%;
`;


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
            <BottomNavContainer>
                <div style={{width:"100%"}}>
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
                <div style={{display:"flex", justifyContent:"space-around", bottom:0,marginBottom: "5px", width:"100%"}}>
                    <StyledLink to="/search">
                        <FontAwesomeIcon icon={faSearch} size="2x"/>
                    </StyledLink>
                    <StyledLink to="/dashboard">
                        <FontAwesomeIcon icon={faBars} size="2x"/>
                    </StyledLink>
                    <StyledLink to="/account">
                        <FontAwesomeIcon icon={faUser} size="2x"/>
                    </StyledLink>
                </div>
            </BottomNavContainer>
        )
    }
}

export default BottomNav;
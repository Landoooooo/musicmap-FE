import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Status =  styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    height:200px;
    -webkit-box-shadow: 0px 7px 11px -8px rgba(0,0,0,0.71);
    -moz-box-shadow: 0px 7px 11px -8px rgba(0,0,0,0.71);
    box-shadow: 0px 7px 11px -8px rgba(0,0,0,0.71);
    border-radius:2%;
    width:75%;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color:black;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const StatusCard = props => {
    if(props.data.text){
        return <Status>
                    <StyledLink to={`/${props.data.user_id}`} style={{width:"45%"}}>
                        <div>
                            <p>{props.data.text}</p>
                        </div>
                    </StyledLink>
                    <StyledLink to={`/${props.data.user_id}`} style={{width:"45%"}}>
                        <div>
                            <img style={{width:"100px", height:"40px"}} alt="status-media" src={props.data.photo}/>
                        </div>
                    </StyledLink>
                </Status>
    }else if(props.data.username){
        return  <Status>
                    <StyledLink to={`/${props.data.user_id}`} style={{width:"45%"}}>
                        <div>
                            <p>{props.data.username}</p>
                            <img alt="profile" src={props.data.profile_photo}/>
                        </div>
                    </StyledLink>
                    <div style={{width:"45%"}}>
                        <Button variant="contained" color="primary" type="submit">Pin User</Button>
                    </div>
                </Status>
    }
}

export default StatusCard;
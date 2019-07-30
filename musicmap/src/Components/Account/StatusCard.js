import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";

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

const GET_USER = gql`
    query($userId: ID!){
        getUserById(userId: $userId){
            username
        }
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color:black;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;



const StatusCard = props => {
    const [username, setUsername] = useState('')

    if(props.data.user_id){
        getUsername(props.data.user_id, setUsername)
    }

    if(props.data.text || props.data.photo || props.data.video || props.data.audio){
        return <Status>
                    <StyledLink to={`/user/${username}`} style={{width:"45%"}}>
                        <div>
                            <p>{props.data.text}</p>
                        </div>
                    </StyledLink>
                    <StyledLink to={`/user/${username}`} style={{width:"45%"}}>
                        <div>
                            <img style={{width:"100px", height:"40px"}} alt="status-media" src={props.data.photo}/>
                        </div>
                    </StyledLink>
                </Status>
    }else if(props.data.username){
        return  <Status>
                    <StyledLink to={`/user/${props.data.username}`} style={{width:"45%"}}>
                        <div>
                            <p>{props.data.username}</p>
                            <img alt="profile" src={props.data.profile_photo}/>
                        </div>
                    </StyledLink>
                    <div style={{width:"45%"}}>
                        <Button variant="contained" color="primary" type="submit">Pin User</Button>
                    </div>
                </Status>
    }else{
        return null;
    }
}


const getUsername = async (id, setUsername) => {
    const client = new ApolloClient({
        uri: "http://localhost:4000"
    })

   await client.query({
        query: GET_USER,
        variables: {
            userId: id
        }
    }).then(res => setUsername(res.data.getUserById.username))
}

export default StatusCard;
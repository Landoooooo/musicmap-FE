import React, { useState, useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import styled from 'styled-components';
import gql from "graphql-tag";
import StatusCard from './StatusCard';
import Button from '@material-ui/core/Button';


const GET_USER = gql`
    query($param: String!, $value: String!){
        getUserBy(param: $param, value: $value){
            id
            type
            profile_photo
        }
    }
`;

const USER_STATUS = gql`
    query($user_id: ID!){
        allStatus(user_id: $user_id){
            id
            text
            photo
            video
            audio
        }
    }
`;

const PIN_USER = gql`
    mutation($input: PinUserInput!){
        pinUser(input: $input)
    }
`;

const StatusContainer = styled.div`
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items:center;
  flex-wrap:nowrap;
  width:100%;
  margin-top:50px;
`;

const ProfilePhotoContainer = styled.div`
    display:flex;
    justify-content:center;
    height:150px;
    width:100%;
`;

const Profile = props => {
    const username = props.match.params.username;

    const [userInfo, setUserInfo] = useState({});
    const [userPosts, setUserPost] = useState([]);

    useEffect(() => {
        getUser(username, setUserInfo);
    }, [username])

    if(userInfo){
        const {id, type, profile_photo, location} = userInfo;
        getStatus(userInfo, setUserPost);

        console.log(id)
        return (
            <>
                <div style={{marginTop:"50px"}}>
                    <ProfilePhotoContainer>
                        <img style={{width:"200px", borderRadius:"50%"}} alt="profile_photo" src={`${profile_photo}`}/>
                    </ProfilePhotoContainer>
                    <p>{username} | {type}</p>
                    <p>{location}</p>
                    <h2>Bio</h2>
                    <Button variant="contained" color="primary" onClick={() => pinUser(id, username)}>Pin User</Button>
                </div>
                <StatusContainer>
                    {
                        userPosts ? (
                            userPosts.map(status => {
                                return <StatusCard data={status}/>
                            })
                        ) : (
                            <div>Loading...</div>
                        )
                    }
                </StatusContainer>
            </>
        )
    }else{
        return(
            <>
                <p>{username}</p>
                <p>unknown</p>
                <p>profile photo</p>
            </>
        )
    }
}

const getUser = async (user, setUserInfo, setUserPost) => {
    const client = new ApolloClient({
        uri: "http://localhost:4000"
    })

    await client.query({
        query: GET_USER,
        variables: {
            param: "username",
            value: user
        }
    }).then(res => {
        setUserInfo(res.data.getUserBy)
    })

    getStatus(user, setUserPost)
}

const getStatus = (userInfo, setUserPost) => {
    const idToken = localStorage.getItem("token");

    const client = new ApolloClient({
        uri: "http://localhost:4000",
        headers: {authorization: idToken}
    })

    client.query({
        query: USER_STATUS,
        variables: {
            user_id: userInfo.id
        }
    }).then(response => {
        setUserPost(response.data.allStatus)
    })
}

const pinUser = async (user_id, username) => {
    const pin = {user_id: user_id, username: username}

    const client = new ApolloClient({
        uri: "http://localhost:4000"
    })

    await client.mutate({
        mutation: PIN_USER,
        variables: {
            input: pin
        }
    }).then(res => console.log(res))
}


export default Profile
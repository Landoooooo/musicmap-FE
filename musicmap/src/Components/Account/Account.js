import React from 'react';
import styled from 'styled-components';
import StatusCard from './StatusCard';
import { NavLink } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag"

const ProfilePhotoContainer = styled.div`
    display:flex;
    justify-content:center;
    height:150px;
    width:100%;
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

const userStatus = gql`
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

const currentUserId = gql`
    {
        getCurrentUser{
            id
            username
            location
            type
            profile_photo
        }
    }
`;
class Account extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: [],
            userInfo: {
                id: null,
                username: "",
                location: "",
                type: "",
                profile_photo: ""
            }
        }
    }

    componentDidMount(){
        const idToken = localStorage.getItem("token");

        const client = new ApolloClient({
            uri: "http://localhost:4000",
            headers: {authorization: idToken}
        })

        client.query({
            query: currentUserId
        }).then(response => {
            const id = response.data.getCurrentUser.id;
            this.setState({
                userInfo: {
                    id: response.data.getCurrentUser.id,
                    username: response.data.getCurrentUser.username,
                    location: response.data.getCurrentUser.location,
                    type: response.data.getCurrentUser.type,
                    profile_photo: response.data.getCurrentUser.profile_photo
                }
            })
            client.query({
                query: userStatus,
                variables: {
                    user_id: id
                }
            }).then( response => {
                this.setState({
                    status: response.data.allStatus
                })
            })
        })
    }

    render(){
        return(
            <div>
                { this.state.userInfo ? (
                    <div style={{marginTop:"50px"}}>
                        <ProfilePhotoContainer>
                            <img style={{width:"200px", borderRadius:"50%"}} alt="profile_photo" src={`${this.state.userInfo.profile_photo}`}/>
                        </ProfilePhotoContainer>
                        <p>{this.state.userInfo.username} | {this.state.userInfo.type}</p>
                        <p>{this.state.userInfo.location}</p>
                        <h2>Bio</h2>
                        <NavLink to="/settings">
                            Settings
                        </NavLink>
                    </div>
                ) : (
                    <div>
                        Loading...
                    </div>
                )

                }
                <div>
                    <StatusContainer>
                        {
                            this.state.status ? (
                                this.state.status.map(status => {
                                    console.log(status)
                                    return(
                                        <StatusCard data={status}/>
                                    )
                                })
                            ) : (
                                <div>Loading...</div>
                            )
                        }
                    </StatusContainer>
                </div>
            </div>
        )
    }
}

export default Account;
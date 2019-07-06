import React from 'react';
import { NavLink } from "react-router-dom";
import BottomNav from '../BottomNav/BottomNav';
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag"

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
        console.log(this.state.userInfo.profile_photo)
        return(
            <div>
                { this.state.userInfo ? (
                    <div>
                        <h1>{this.state.userInfo.username}</h1>
                        <h2>{this.state.userInfo.location}</h2>
                        <span>{this.state.userInfo.type}</span>
                        <div>
                            <img alt="profile_photo" src={`${this.state.userInfo.profile_photo}`}/>
                        </div>
                    </div>
                ) : (
                    <div>
                        Loading...
                    </div>
                )

                }
            <div>
                <h2>Posts</h2>
                <h2>Bio</h2>
                <NavLink to="/settings">
                    Settings
                </NavLink>
            </div>
            <BottomNav/>
    </div>
        )
    }
}

export default Account;
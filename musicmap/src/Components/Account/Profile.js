import React from 'react';


const Profile = props => {
    const username = props.match.params.username
    console.log(username)
    return  <div>
                <p>{username}</p>
            </div>
}

export default Profile
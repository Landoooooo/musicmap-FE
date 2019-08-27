import React, { useState } from 'react';
import styled from 'styled-components';

const ProfilePhotoContainer = styled.div`
    display:flex;
    justify-content:center;
    height:150px;
    width:100%;
`;

const DefaultProfile = styled.div`
    display:flex;
    justify-content:center;
    height:150px;
    width:100%;
`;

const ProfileImage = props => {
    const singleLetter = props.user.charAt(0)
    if(props.image){
        return (
            <ProfilePhotoContainer>
                {!props.image.includes('jpg') ? <img style={{width:"200px", borderRadius:"50%"}} alt="profile_photo" src={`${props.image}`}/> : <div style={{width:"150px", borderRadius:"50%", backgroundColor:"grey", display:"flex", justifyContent:"center", alignItems:"center"}}><h1>{`${singleLetter}`}</h1></div>}
            </ProfilePhotoContainer>
        )
    }else{
        return (
            <DefaultProfile>
                <div style={{width:"150px", borderRadius:"50%", backgroundColor:"grey", display:"flex", justifyContent:"center", alignItems:"center"}}><h1>{`${singleLetter}`}</h1></div>
            </DefaultProfile>
        )
    }

}

export default ProfileImage;
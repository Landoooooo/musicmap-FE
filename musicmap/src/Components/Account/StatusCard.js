import React from 'react';
import styled from 'styled-components';

const Status =  styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    height:100px;
    -webkit-box-shadow: 0px 7px 11px -8px rgba(0,0,0,0.71);
    -moz-box-shadow: 0px 7px 11px -8px rgba(0,0,0,0.71);
    box-shadow: 0px 7px 11px -8px rgba(0,0,0,0.71);
    border-radius:2%;
`;

const StatusCard = props => (
    <Status>
        <div style={{width:"45%"}}>
            <p>{props.status.text}</p>
        </div>
        <div style={{width:"45%"}}>
            <img style={{width:"100px", height:"40px"}}alt="status-media" src={props.status.photo}/>
        </div>

    </Status>
)

export default StatusCard;
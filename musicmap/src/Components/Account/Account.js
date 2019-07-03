import React from 'react';
import { NavLink } from "react-router-dom";
import BottomNav from '../BottomNav/BottomNav';

const Account = () => (
    <div>
        <h1>Account</h1>
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

export default Account;
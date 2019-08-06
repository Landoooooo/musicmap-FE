import React from 'react';
import Recommended from './Recommended';
import Feed from './Feed';
import BottomNav from '../BottomNav/BottomNav';

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div>
                {/* <Recommended/> */}
                <Feed/>
            </div>
        )
    }
}

export default Dashboard;
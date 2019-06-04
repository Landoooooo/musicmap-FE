import React from 'react';

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <div className="recommend-artist">
                    <h1>Work with these artists</h1>
                    <div>
                        <div>
                            <div>
                                <div>Photo</div>
                                <h2>Artist name</h2>
                            </div>
                            <div>
                                <div>Photo</div>
                                <h2>Artist name</h2>
                            </div>
                            <div>
                                <div>Photo</div>
                                <h2>Artist name</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="feed">
                    <div>
                        <h2>artist posted new content</h2>
                        <div>Photo</div>
                    </div>
                    <div>
                        <h2>artist posted new content</h2>
                        <div>Photo</div>
                    </div>
                    <div>
                        <h2>artist posted new content</h2>
                        <div>Photo</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
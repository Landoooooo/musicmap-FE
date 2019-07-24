import React from "react";
import BottomNav from '../BottomNav/BottomNav';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";

import Profile from "../Account/Profile";
import StatusCard from "../Account/StatusCard";


// Change text to query for search
const searchQuery = gql`
  query($text: String!){
    search(text: $text){
      __typename
      ... on User{
        username
        type
        profile_photo
      }
      ... on Status{
        user_id
        text
        photo
        video
        audio
      }
    }
  }
`;

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: "",
      queryResult: []
    }
  }


  search = e => {
    e.preventDefault();

    const client = new ApolloClient({
      uri: "http://localhost:4000"
    })

    client.query({
      query: searchQuery,
      fetchPolicy: 'no-cache',
      variables: {
        text: this.state.text
      }
    }).then(response => {
      const data = response.data.search

      const userStatus = data.filter(status => status)
      const username = data.filter(user => user)

      this.setState({
        queryResult: userStatus || username
      })

      console.log(this.state.queryResult)
    }).catch(err => {
      console.log("ERROR", err)
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render(){
    return(
      <div>
        <div>
          <form onSubmit={this.search}>
            <TextField
              id="text"
              name="text"
              value={this.state.text}
              margin="dense"
              onChange={this.handleChange}
            />
            <Button variant="contained" color="primary" type="submit">
              Search
            </Button>
          </form>
          {
            this.state.queryResult ? (
              this.state.queryResult.map(result => {
                return <StatusCard data={result}/>
              })
            ) : (
              <div>No results</div>
            )
          }
        </div>
        <BottomNav/>
      </div>
    )
  }
}


export default Search;

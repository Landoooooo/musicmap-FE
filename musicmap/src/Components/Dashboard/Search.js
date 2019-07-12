import React from "react";
import BottomNav from '../BottomNav/BottomNav';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";

const searchQuery = gql`
  query($text: String!){
    search(text: $text){
      __typename
      ... on User{
        username
      }
      ... on Status{
        text
      }
    }
  }
`;

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: "",
      results: []
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
      console.log(response)
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
        <BottomNav/>
      </div>
    )
  }
}


export default Search;

import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const GET_USERS_QUERY = gql`
query {
    users {
      id
      email_address
      password
    }
  }
`

export default class Users extends React.Component{
    render() {
        return (
          <Query
            query={GET_USERS_QUERY}
          >
            {
              ({data, error, loading}) => {
                if (error || loading) {
                  return <View><Text>Loading...</Text></View>
                }
                return (
                  <FlatList contentContainerStyle={{flex:1, justifyContent:"center", alignItems:"center"}}
                    data={data.users}
                    renderItem={({item}) => <Text>{item.email_address}</Text>}
                    keyExtractor={(item) => item.id.toString()}
                  />
                )
              }
            }
          </Query>
        )
      }
}


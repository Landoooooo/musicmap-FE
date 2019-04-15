import React, { Component } from 'react';
import { View, Text } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const GET_USERS_QUERY = gql`
query{
    users {
      id
      email_address
      password
    }
  }
`

const Users = () => (
    <Query query={GET_USERS_QUERY}>
        {({ loading, error, data }) => {
            if (loading) return <Text>"Loading..."</Text>
            if (error) return <Text>Error! ${error.message}</Text>;
            console.log("User ID", data.users.id)
            return (
                <View>
                    {data.users.map(user => {
                        <Text>{user.email_address}</Text>
                    })}
                </View>
            );
        }}
    </Query>
);

export default Users;

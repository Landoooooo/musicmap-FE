const { gql } = require("apollo-server");

module.exports = gql`
    type Query {
        #//*User
        getCurrentUser: User
        getUserBy(param: String!, value: String!): User
        getUserById(userId: ID!): User
    }

    type Mutation {
        #//*User
        addUser(input: UserInput!): User!
        updateUser(id: ID!, input: UserInput!): User!
        deleteUser(id: ID!): Int!

        #//*AWS
        signS3(filename: String!, filetype: String!): S3Payload!
    }

    scalar Date

    type User {
        id: ID!
        email: String!
        firstName: String!
        lastName: String!
        username: String!
        location: String!
        type: String!
        profile_photo: String
    }

    type Status {
        id: ID!
        user_id: User!
        text: String!
        photo: String!
        video: String!
        audio: String!
    }

    type S3Payload {
        signedRequest: String!,
        url: String!
    }

    input UserInput {
        email: String!
        firstName: String!
        lastName: String!
        username: String!
        location: String!
        type: String!
        profile_photo: String

    }

`;
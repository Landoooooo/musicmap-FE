const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDef");
const { findOrCreateUser } = require("./controllers/userController");
const resolvers = require("./resolvers/index");

require("dotenv/config");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: async({ req }) => {
        let authToken = null;
        let currentUser = null;
        try{
            authToken = req.headers.authorization;
            if (authToken) {
                currentUser = await findOrCreateUser(authToken);
            }
        } catch (err) {
            console.error(`Unable to authenticate user with token ${authToken}`)
        }
        return { currentUser };
    }
});

module.exports  = server;

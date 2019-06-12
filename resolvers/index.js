const GMR = require("graphql-merge-resolvers");

const userResolver = require("./users/usersResolvers");

module.exports = GMR.merge([
    userResolver
]);
const GMR = require("graphql-merge-resolvers");

const userResolver = require("./users/usersResolvers");
const awsResolver = require("./aws/resolver");

module.exports = GMR.merge([
    userResolver,
    awsResolver
]);
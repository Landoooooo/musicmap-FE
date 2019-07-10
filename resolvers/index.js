const GMR = require("graphql-merge-resolvers");

const userResolver = require("./users/usersResolvers");
const awsResolver = require("./aws/resolver");
const statusResolver = require("./status/statusResolver");
const searchResolver = require("./search/searchResolver");

module.exports = GMR.merge([
    userResolver,
    awsResolver,
    statusResolver,
    searchResolver
]);
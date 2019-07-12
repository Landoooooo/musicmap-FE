const Status = require("../../models/statusModel");
const User = require("../../models/usersModel");

module.exports = {
    Query: {
        search: async (root, args, ctx) => {
            if(args.text){
                const result = await Status.findBy({text: args.text})
                const user = await User.findBy({"username": args.text})
                console.log("search", [result, user])
                return result
            }
        }
    },

    Result: {
        async __resolveType(obj, context, info){
            console.log("Object", obj)
            if(obj.text && obj.username){
                const result = 'Status'
                return result
            }
        }
    }
}
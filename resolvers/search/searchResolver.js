const Status = require("../../models/statusModel");
const User = require("../../models/usersModel");

module.exports = {
    Query: {
        search: async (root, args, ctx) => {
            console.log(args.text);

            const texts = args.text

            const text = await Status.findBy({text: texts})

            return text;
        }
    },

    Result: {
        __resolveType(obj, context, info){
            console.log("obj",obj)
            if(obj.username){
                return 'User'
            }

            if(obj.text){
                return 'Status'
            }

            return null;
        }
    }
}
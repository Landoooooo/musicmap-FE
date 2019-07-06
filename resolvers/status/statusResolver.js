const Status = require("../../models/statusModel");

module.exports = {
    Query: {
       allStatus: async (root, args, ctx) => {
           const allStatus = await Status.findAllById(args.user_id)

           return allStatus;
       }
    },

    Mutation: {
        newStatus: async (root, args, ctx) => {

            console.log(args)
            const newStatus = await Status.newStatus(args.input)

            console.log("newStatus",newStatus)

            return newStatus;
        },
        deleteStatus: async (root, args, ctx) => {
            const status = await Status.remove(args.id);

            return status;
        }
    }
}
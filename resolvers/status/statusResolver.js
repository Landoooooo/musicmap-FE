const Status = require("../../models/");

module.exports = {
    Query: {
       allStatus: async (root, args, ctx) => {
           const allStatus = await Status.findAllById(args.input)

           return allStatus;
       }
    },

    Mutation: {
        newStatus: async (root, args, ctx) => {
            const newStatus = await Status.newStatus(args.input)

            return newStatus;
        },
        deleteStatus: async (root, args, ctx) => {
            const status = await Status.remove(args.id);
            
            return status;
        }
    }
}
const { AuthenticationError } = require("apollo-server");

const User = require("../../models/usersModel");
const Status = require("../../models/statusModel");
const Pinned = require("../../models/pinUserModel");

const authenticated = next => (root, args, ctx, info) => {
    if (!ctx.currentUser) {
      throw new AuthenticationError("You must be logged in!");
    }
    return next(root, args, ctx, info);
};


module.exports = {
    Query: {
        getCurrentUser: authenticated((root, args, ctx) => ctx.currentUser),

        getUserById: async (root, args, ctx) => {
            const user  = await User.findById(args.userId)

            return user;
        },
        getUserBy: async (root, args, ctx) => {
            const user = await User.findBy({ [args.param]: args.value})

            return user[0];
        }
    },

    User: {
        status: async (root, args, ctx) => {
            const allStatus = await Status.findAllById(root.id)

            return allStatus;
        },

        pinned: async (root, args, ctx) => {
            const pinnedUsers = await Pinned.find(root.id)

            return pinnedUsers
        }
    },

    Mutation: {
        addUser: async (root, args, ctx) => {
            const newUser = await User.add(args.input)

            return newUser;
        },
        deleteUser: async (root, args, ctx) => {
            const count = await User.remove(args.id);
            return count;
        },
        updateUser: async (root, args, ctx) => {
            const user = await User.edit(args.id, args.input);
            return user;
        },
        pinUser: async (root, args, ctx) => {

            const pinnedUser = await Pinned.pinUser(args.input)

            if(pinnedUser){
                return 1;
            }else{
                return 0
            }
        }

    }
}
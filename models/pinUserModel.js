const db = require("../data/dbConfig");

module.exports = {
    findById,
    pinUser,
    find
}

function findById(id) {
    return db("pinnedUsers")
        .where({ id })
        .first();
}

async function pinUser(user){
    const [id] = await db("pinnedUsers").insert(user, "id")

    return findById(id)
}

async function find(user_id){
    const user = await db("pinnedUsers").where({user_id})

    return user

}
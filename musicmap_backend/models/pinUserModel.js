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

async function find(feed_id){
    try{
        const pin = db("pinnedUsers").where({feed_id})
        const test = pin.map( user => {
            const pinUser = db("users").where("id", user.user_id)
            if(pinUser){
                const userTest = pinUser.map(user => {
                    return user
                })
                return userTest
            }else{
            }
        })
        const help = await test;
        help.map(helping => helping)
        return help
    }catch (e){
        console.log(e)
    }
}
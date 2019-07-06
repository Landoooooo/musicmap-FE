const db = require("../data/dbConfig");

module.exports = {
    findBy,
    findById,
    findAllById,
    newStatus,
    remove
}
function findBy(filter){
    return db("userStatus").where(filter)
}

function findById(id){
    return db("userStatus")
        .where({ id })
        .first()
}

function findAllById(user_id) {
    return db("userStatus")
      .where({ user_id })
}
async function newStatus(status){
    const [id] = await db("userStatus").insert(status, "id");

    return findById(id);
}

function remove(id){
    return db("userStatus")
        .where("id", id)
        .del();
}


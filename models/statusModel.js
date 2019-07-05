const db = require("../data/dbConfig");

module.exports = {
    findBy,
    findById,
    findAllById,
    newStatus,
    remove
}
function findBy(filter){
    return db("status").where(filter)
}

function findById(id){
    return db("status")
        .where({ id })
        .first()
}

function findAllById(user_id) {
    return db("status")
      .where({ user_id })
}
function newStatus(status){
    const [id] = await db("status").insert(status, "id");

    return findById(id);
}

function remove(id){
    return db("status")
        .where("id", id)
        .del();
}



exports.up = function(knex, Promise) {
    return knex.schema.createTable("userStatus", tbl => {
        tbl.increments();
        tbl
            .integer("user_id")
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        tbl.string("text", 255);
        tbl.string("photo", 255);
        tbl.string("video", 255);
        tbl.string("audio", 255);
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("userStatus")
};

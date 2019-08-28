
exports.up = function(knex, Promise) {
  return knex.schema.createTable("pinnedUsers", tbl => {
        tbl.increments()
        tbl
            .integer("user_id")
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        tbl
            .string("username")
            .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("pinnedUsers")
};

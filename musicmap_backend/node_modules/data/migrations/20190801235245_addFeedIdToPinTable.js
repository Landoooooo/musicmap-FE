
exports.up = function(knex, Promise) {
  return knex.schema.table("pinnedUsers", tbl => {
      tbl
        .integer("feed_id")
        .unsigned()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("pinnedUsers", tbl => {
      tbl
        .dropColumn("pinnedUsers")
  })
};

exports.up = function(knex, Promise) {
    return knex.schema.createTable( "users", tbl => {
      tbl.increments();
      tbl
          .string("email")
          .notNullable()
          .unique();
      tbl
          .string("firstName", 255)
          .notNullable();
      tbl
          .string("lastName", 255)
      tbl
          .string('username', 255)
          .notNullable()
          .unique();
      tbl
          .string("location")
          .notNullable();
      tbl
          .string("type")
          .notNullable();
      tbl
          .string("profile_photo", 255);
    })
  };

  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists("users");
  };

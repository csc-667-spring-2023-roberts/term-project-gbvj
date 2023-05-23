/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */

const { v4: uuidv4 } = require("uuid");

exports.up = async (pgm) => {
  await pgm.db.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  pgm.createTable("users", {
    // From the docs, "id" is equivalent to: { type: 'serial', primaryKey: true }
    uid: {
      type: "varchar(1000)",
      notNull: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    userName: {
      type: "varchar(1000)",
      notNull: true,
    },
    password: {
      type: "varchar(1000)",
      notNull: true,
    },
    email: {
      type: "varchar(1000)",
      notNull: true,
    },
  });
};

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable("test_table");
};

const connectionString = process.env.pg_URL;
const { Pool } = require("pg");

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = pool;

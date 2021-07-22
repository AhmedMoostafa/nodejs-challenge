const connectionString =
  "postgres://dxvkftauejnauw:7e2f77a6559de406b0099fc9923fab2487782bace6dbce61ead6f0f7760a557c@ec2-44-194-145-230.compute-1.amazonaws.com:5432/d4df1tkng8t19d";

const { Pool } = require("pg");

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = pool;

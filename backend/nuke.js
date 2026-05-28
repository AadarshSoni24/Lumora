const mysql = require('mysql2/promise');
require('dotenv').config({ path: __dirname + '/.env' });

async function nuke() {
  try {
    const pool = mysql.createPool({ host: process.env.DB_HOST, port: process.env.DB_PORT, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
    await pool.query("DELETE FROM images WHERE title LIKE '%Virat%' OR title LIKE '%Spice%' OR title LIKE '%Mehndi%'");
    console.log('success');
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

nuke();

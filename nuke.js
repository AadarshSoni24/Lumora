const mysql = require('mysql2/promise');
require('dotenv').config({ path: 'c:/Users/aadar/Downloads/cms/CMS/CMS/backend/.env' });

async function nuke() {
  try {
    const pool = mysql.createPool(process.env.MYSQL_URL);
    await pool.query("DELETE FROM images WHERE title LIKE '%Virat%' OR title LIKE '%Spice%' OR title LIKE '%Mehndi%'");
    console.log('success');
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

nuke();

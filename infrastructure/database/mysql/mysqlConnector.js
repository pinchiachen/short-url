import mysql from 'promise-mysql';

async function query(sql) {
  const pool = await mysql.createPool({
    host: process.env.MYSQL_SHORT_URL_HOST,
    user: process.env.MYSQL_SHORT_URL_USER,
    password: process.env.MYSQL_SHORT_URL_PASSWORD,
    connectionLimit: 3,
    charset: 'utf8mb4_unicode_ci',
    timezone: 'utc',
  });

  return pool.query(sql);
}

const mysqlConnector = {
  query,
};

export default mysqlConnector;

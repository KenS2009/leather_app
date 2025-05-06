require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();

// DB 接続プール
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get('/ping', (req, res) => {
  pool.query('SELECT 1', (err) => {
    if (err) return res.status(500).send('DB接続失敗');
    res.send('DB接続成功！');
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

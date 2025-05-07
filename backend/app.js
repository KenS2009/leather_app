require('dotenv').config();
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const pool = require('./db');
const indexRouter = require('./routes/index'); //　ルート分割用

const app = express();

// ─── View エンジンの設定 ─────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// DB 接続プール
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// ─── ルーティング ──────────────────────────────
// ルート “/” は routes/index.js に委譲
app.use('/', indexRouter);

// ping エンドポイント
app.get('/ping', (req, res) => {
  pool.query('SELECT 1', (err) => {
    if (err) return res.status(500).send('DB接続失敗');
    res.send('DB接続成功！');
  });
});

// ─── サーバ起動 ───────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { app, pool };
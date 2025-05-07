const express = require('express');
const router = express.Router();

// app.js からプールを取り込む方法
const { pool } = require('../app');
const pool = require('../db');

router.get('/', (req, res) => {
  const sql = `
    SELECT 
      w.id, w.title, w.description, w.image_path, u.name 
    FROM works AS w
    JOIN users AS u ON w.user_id = u.id
    ORDER BY w.created_at DESC
  `;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('作品一覧の取得に失敗しました');
    }
    // results は [{id, title, description, image_path, name}, ...]
    res.render('index', {
      title: 'LeatherWorks へようこそ',
      works: results
    });
  });
});

module.exports = router;

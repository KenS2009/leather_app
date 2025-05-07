const express = require('express');
const router = express.Router();

// 今はタイトルだけ渡す
router.get('/', (req, res) => {
  res.render('index', {
    title: 'LeatherWorks へようこそ',
    works: []  // のちほど DB から取得した配列をここに入れる
  });
});

// （のちほど）投稿ページへのルートや詳細ルートもここに追加していきます。
// router.get('/works/new', …);
// router.get('/works/:id', …);

module.exports = router;

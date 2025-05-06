# Dockerfile (プロジェクト直下)
FROM node:18

# 作業ディレクトリ
WORKDIR /app

# 依存関係だけ先にコピーしてインストール
COPY backend/package*.json /app/
RUN npm install

# アプリ本体をコピー
COPY backend/ /app/

# ポート公開
EXPOSE 3000

# 起動コマンド
CMD ["node", "app.js"]

<br><br>

<p align='center' >
  <img  src='/src/assets/logo.svg' alt='Vuetify3' width='300'/>
</p>
<br><br>
<h6 align='center'>
<a href="https://unsplash.vuetify3.com/">ライブ・デモ</a>
</h6>

<br>

<p align='center'>
<a href="https://github.com/yangjiakai/vuetify3-unsplash/blob/main/README.md">English</a> | <a href="https://github.com/yangjiakai/vuetify3-unsplash/blob/main/README.zh-CN.md">简体中文</a>| <b >日本語</b>
</p>

## 序文

Unsplash のウェブサイトを模倣したフルプラットフォームのギャラリーアプリを開発し、すべての API 呼び出しは公式の Unsplash API に行われています。

## Preview

<img  src='/src/assets/preview.png'  alt='Vuetify3' />
<img  src='/src/assets/preview2.png'  alt='Vuetify3' />

## 特徴

- ⚡️ [Vue 3](https://github.com/vuejs/core)
- ⚡️ [Vite](https://github.com/vitejs/vite)
- ⚡️ UI Framework [Vuetify 3](https://next.vuetifyjs.com/en/)
- ⚡️ TypeScript
- 📦 コンポーネント　自動的にインポート
- 🍍 [Pinia](https://pinia.vuejs.org/)で State 管理
- 🍍 pinia-plugin-persist State の永続性
- ⚡️ 新しい `<script setup>` 文法の使用
- ⚡️ 任意のアイコンセット [Iconify](https://icon-sets.iconify.design/)
- ⚡️ Netlify でのゼロ設定部署
- ⚡️ 18n 多言語切り替え
- ⚡️ dark light モード切り替え
- ⚡️ 主題色切り替え
- ⚡️ vue3-perfect-scrollbar スクロールバーの美化
- ☁️ レスポンシブで多プラットフォームに適応

<br>

## 今すぐ試す!

```
git clone https://github.com/yangjiakai/vuetify3-unsplash.git

cd vuetify3-unsplash

npm install

npm run dev
```

## api 请求

> API リクエストに関して、私の示例では Unsplash の API を使用しました。
>
> 自分自身の`ACCESS_KEY`を申請するために、Unsplash 開発者プラットフォームに行く必要があります。
>
> https://unsplash.com/oauth/applications
>
> 次に、ローカルに新しい`.env.local` ファイルを作成します
>
> `VITE_UNSPLASH_ACCESS_KEY = 自分のAccess Key`を追加します。

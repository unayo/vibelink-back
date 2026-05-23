# TypeScript - 商品管理系統

這是一個基於 Vue 3 和 TypeScript 的商品管理系統練習


```bash
npm install
```


```bash
npm run dev
```

```bash
npm run type-check
```


## 專案結構說明

```
vibelink-back/
├── src/
│   ├── types/              # 型別定義
│   │   ├── product.ts      # 商品相關型別 (
│   │   ├── order.ts        # 訂單相關型別
│   │   └── user.ts         # 使用者相關型別
│   ├── api/                # API 請求層
│   │   ├── products.ts     # 商品 API (
│   │   ├── order.ts        # 訂單 API
│   │   └── user.ts         # 使用者 API
│   ├── composable/         # 組合式 API
│   │   ├── useProductData.ts
│   │   └── useImageUpload.ts
│   ├── components/         # Vue 元件
│   │   ├── ProductModal.vue
│   │   └── ...
│   └── views/              # 頁面元件
│       ├── ProductManagement.vue
│       └── ...
├── package.json
├── tsconfig.json           # TypeScript 設定
└── vite.config.ts          # Vite 設定

```
# vibelink-back

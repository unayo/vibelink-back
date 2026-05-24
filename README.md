<img width="1257" height="666" alt="截圖 2026-05-24 下午3 49 15" src="https://github.com/user-attachments/assets/02866136-c25f-4e2d-8264-725c9c348307" />

<img width="1257" height="663" alt="截圖 2026-05-24 下午3 49 27" src="https://github.com/user-attachments/assets/e86de30a-29eb-49cf-8b1b-d35cfda84e16" />

# TypeScript - 商品管理系統

這是一個基於 Vue 3 和 TypeScript 的商品管理系統練習。

## 技術棧與版本說明

- 前端框架：Vue 3 (v3.5.18) — 用 <script setup> 與 Composition API

- 程式語言：TypeScript (v5.8.0) — 開啟 strict 嚴格模式，型別推導與靜態檢查。

- 非同步請求：Axios (v1.12.2) — 結合 TS 泛型封裝全域攔截器（Interceptors）與 API Method。

- 路由管理：Vue Router (v4.5.1) — 後台單頁應用（SPA）路由控管。

- UI 樣式框架：Bootstrap (v5.3.8) + Sass-embedded (v1.93.1) — 響應式後台版面與自訂樣式編譯。

- Vite (v7.0.6) — 極速開發伺服器與打包工具。


## TypeScript 實踐

1. `src/types/product.ts` 利用進階型別簡化邏輯
透過 MessageResponse 進行抽象，並以強型別繼承/擴充方式衍生出 CreateProductResponse、EditProductResponse、DeleteProductResponse，極大化型別複用性：
```
type MessageResponse = { success: boolean; message: string }
export type CreateProductResponse = MessageResponse
```

2. `src/composable/useProductData.ts` 邏輯抽離

-- 利用 Vue 3 的 Composition API 將商品表單的複雜狀態（編輯/新增切換、資料載入、狀態重置）抽離為可複用的 useProductForm 函式。

-- 明確定義 Composable 的回傳介面 UseProductFormResult，嚴格規範 form 狀態必須為 Ref<ProductData>，確保狀態在跨元件傳遞、或綁定到 Modal 時，皆維持響應式與型別安全。

```
export function useProductForm(): UseProductFormResult {
  const form = ref<ProductData>(getInitialProductData()) // 1. 表單狀態
  const formTitle = ref('新增商品')                       // 2. 編輯/新增切換的標題

  // 3. 資料載入（點擊「編輯」時，把後端或列表的資料塞進表單）
  const loadProduct = (data: ProductData | null): void => {
    if (data) {
      form.value = { ...data }
      formTitle.value = '編輯商品'
    } else {
      resetForm()
    }
  }

  // 4. 狀態重置（按取消、或新增成功後，把表單清空）
  const resetForm = (): void => {
    form.value = getInitialProductData()
    formTitle.value = '新增商品'
  }

  return { form, formTitle, loadProduct, resetForm }
}
```
## 指令

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

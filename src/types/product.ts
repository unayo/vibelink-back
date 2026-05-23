// ==========================================
// TypeScript 練習題目 - 商品相關型別定義
// ==========================================

// TODO: 定義商品基本資料型別
export type ProductData = {
  id: string
  title: string
  category: string
  origin_price: number
  price: number
  unit: string
  description: string
  content: string
  is_enabled: number
  imageUrl: string
  imagesUrl: string[] 
  num: number
}

// TODO: 定義分頁資訊型別
export type Pagination = {
  // 在這裡加上型別定義，將 unknown 替換為正確的型別
  total_pages: number
  current_page: number
  has_pre: boolean
  has_next: boolean
  category: string
}

// TODO: 定義建立商品參數型別
export type CreateProductParams = {
  title: string
  category: string
  origin_price: number
  price: number
  unit: string
  description: string
  content: string
  is_enabled: number
  imageUrl: string
  imagesUrl: string[]
}

// TODO: 定義編輯商品參數型別
export type EditProductParams = {
  id: string
  data: {
    title: string
    category: string
    origin_price: number
    price: number
    unit: string
    description: string
    content: string
    is_enabled: number
    imageUrl: string
    imagesUrl: string[]
  }
}

// TODO: 定義取得商品列表回應型別
export type GetProductsResponse = {
  success: boolean
  products: ProductData[]
  pagination: Pagination
  messages: string[]
}

// TODO: 定義訊息回應基本型別
type MessageResponse = {
  success: boolean
  message: string
}

// TODO: 使用 MessageResponse 定義以下型別
export type CreateProductResponse = MessageResponse
export type EditProductResponse = MessageResponse
export type DeleteProductResponse = MessageResponse

// TODO: 定義圖片上傳回應型別
export type UploadImageResponse = {
  success: boolean
  imageUrl: string
}

// ==========================================
// TypeScript 練習題目 - 商品 API 請求函式
// ==========================================

// 🎯 練習目標：
// 1. 學習函式型別定義
// 2. 理解泛型 (Generic) 的使用
// 3. 熟悉 Promise 和 AxiosResponse 的型別

// 📝 練習說明：
// 請為以下函式加上正確的 TypeScript 型別註解
// 提示：需要從 @/types/product 匯入相關型別

import type {CreateProductParams, GetProductsResponse, CreateProductResponse, EditProductParams,EditProductResponse, DeleteProductResponse,UploadImageResponse} from '@/types/product'
import axios from 'axios'
import type {AxiosResponse} from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_PATH = import.meta.env.VITE_API_PATH

const productApi = axios.create({
  baseURL: BASE_URL,
})

productApi.interceptors.request.use(
  (request) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

    if (token) {
      request.headers['Authorization'] = token
    }

    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

productApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)

export const apiGetProducts = (params:{
  page?: string;
  category?: string
}):Promise<AxiosResponse<GetProductsResponse>> =>
  productApi.get(`/v2/api/${API_PATH}/admin/products`, {
    params,
  })

export const apiCreateProduct = (params:CreateProductParams):Promise<AxiosResponse<CreateProductResponse>> =>
  productApi.post(`/v2/api/${API_PATH}/admin/product`, {
    data: params,
  })

export const apiEditProduct = (params:EditProductParams):Promise<AxiosResponse<EditProductResponse>> => {
  const { data, id } = params
  return productApi.put(`/v2/api/${API_PATH}/admin/product/${id}`, {
    data,
  })
}

export const apiDeleteProduct = (productId:string):Promise<AxiosResponse<DeleteProductResponse>> =>
  productApi.delete(`/v2/api/${API_PATH}/admin/product/${productId}`)

export const apiUploadImage = async (file:FormData):Promise<AxiosResponse<UploadImageResponse>> =>
  productApi.post(`/v2/api/${API_PATH}/admin/upload`, file)

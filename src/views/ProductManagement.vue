<script setup lang="ts">
import { apiDeleteProduct, apiGetProducts } from '@/api/products'

import DeleteModal from '@/components/DeleteModal.vue'
import ProductModal from '@/components/ProductModal.vue'

import type {Pagination, ProductData} from '@/types/product'
import { onMounted, ref, useTemplateRef } from 'vue'

const productModalRef = useTemplateRef<InstanceType<typeof ProductModal>>('productModalRef')
const deleteModalRef = useTemplateRef<InstanceType<typeof DeleteModal>>('deleteModalRef')

const currentPage = ref<string>('1')

const products = ref<ProductData[]>([])

const pagination = ref<Pagination>({
  total_pages: 0,
  current_page: 0,
  has_pre: false,
  has_next: false,
  category: '',
})

const getProducts = async () => {
  try {
    const res = await apiGetProducts({
      page: currentPage.value,
    })

    products.value = res.data.products
    pagination.value = res.data.pagination
  } catch {
    alert('取得產品列表失敗')
  }
}
onMounted(() => {
  getProducts()
})

const getInitialProductData = ():ProductData => ({
  id: '',
  title: '',
  origin_price: 0,
  price: 0,
  category: '',
  unit: '',
  num: 0,
  content: '',
  description: '',
  is_enabled: 1,
  imageUrl: '',
  imagesUrl: [''],
})

const tempProduct = ref<ProductData>(getInitialProductData())

const openModal = (product:ProductData | null = null) => {
  if (product) {
    tempProduct.value = { ...product, imagesUrl: product.imagesUrl ? [...product.imagesUrl] : [''] }
  }

  productModalRef.value?.openModal()
}

const openDeleteModal = (productId: string) => {
  deleteModalRef.value?.openModal(() => handleDeleteProduct(productId))
}

const handleDeleteProduct = async (productId: string):Promise<void> => {
  try {
    await apiDeleteProduct(productId)
  } catch {
    alert('刪除商品失敗')
  } finally {
    getProducts()
  }
}
</script>

<template>
  <div class="d-flex justify-content-end align-items-center mb-4">
    <button @click="openModal(null)" type="button" class="btn btn-dark rounded-lg px-4 py-2">
      <i class="fas fa-plus me-2"></i>新增商品
    </button>
  </div>
  <div class="card shadow-sm rounded-lg flex-grow-1">
    <div class="card-body p-4">
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">分類</th>
              <th scope="col">商品名稱</th>
              <th scope="col">原價</th>
              <th scope="col">售價</th>
              <th scope="col" class="text-center">啟用</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.category }}</td>
              <td>{{ product.title }}</td>
              <td>{{ product.origin_price }}</td>
              <td>{{ product.price }}</td>
              <td class="text-center">
                <div
                  class="form-check form-switch d-flex justify-content-center align-items-center"
                >
                  <input
                    readonly
                    class="form-check-input"
                    style="pointer-events: none"
                    type="checkbox"
                    id="flexSwitchCheckDefault1"
                    :checked="Boolean(product.is_enabled)"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <button
                  @click="openModal(product)"
                  type="button"
                  class="btn btn-sm btn-outline-dark rounded-lg me-2"
                >
                  編輯
                </button>
                <button
                  @click="openDeleteModal(product.id)"
                  type="button"
                  class="btn btn-sm btn-outline-danger rounded-lg"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <nav class="d-flex justify-content-center mt-4">
        <ul class="pagination">
          <li class="page-item">
            <button
              @click="currentPage = String(Number(currentPage) - 1)"
              :disabled="!pagination?.has_pre"
              type="button"
              class="page-link"
              :class="{ disabled: !pagination?.has_pre }"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li v-for="pageNum in pagination?.total_pages" :key="pageNum" class="page-item">
            <button
              @click="currentPage = pageNum.toString()"
              :disabled="currentPage === pageNum.toString()"
              type="button"
              class="page-link"
              :class="{ active: currentPage === pageNum.toString() }"
            >
              {{ pageNum }}
            </button>
          </li>
          <li class="page-item">
            <button
              @click="currentPage = String(Number(currentPage) + 1)"
              :disabled="!pagination?.has_next"
              class="page-link"
              :class="{ disabled: !pagination?.has_next }"
              type="button"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <ProductModal ref="productModalRef" :product="tempProduct" @get-products="getProducts" />
  <DeleteModal ref="deleteModalRef" title="刪除商品" content="確定要刪除該商品嗎？" />
</template>

<style lang="scss" scoped></style>

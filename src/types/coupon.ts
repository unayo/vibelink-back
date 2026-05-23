import type { Pagination } from './common';

// 優惠券基本型別
export type CouponData = {
  id: string;
  title: string;
  is_enabled: number;
  percent: number;
  due_date: number;
  code: string;
};

// 建立優惠券參數型別
export type CreateCouponParams = {
  title: string;
  is_enabled: number;
  percent: number;
  due_date: number;
  code: string;
};

// 編輯優惠券參數型別
export type EditCouponParams = {
  id: string;
  data: {
    title: string;
    is_enabled: number;
    percent: number;
    due_date: number;
    code: string;
  };
};

// API 回應型別
export type GetCouponsResponse = {
  success: boolean;
  coupons: CouponData[];
  pagination: Pagination;
  messages: unknown[];
};

// 訊息回應型別
type MessageResponse = {
  success: boolean;
  message: string;
};

export type CreateCouponResponse = MessageResponse;
export type EditCouponResponse = MessageResponse;
export type DeleteCouponResponse = MessageResponse;

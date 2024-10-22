import { CartItemsType, Product } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToRupee(price: number) {
  return parseFloat((price * 84).toFixed(2));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN").format(price);
}

export function formatPercentage(percentage: number) {
  return Math.round(percentage);
}

export function sortProductsByPrice(products: Product[], order: "asc" | "desc" = "asc") {
  return order === "asc"
    ? (products as any).toSorted((product1: Product, product2: Product) => product1.price - product2.price)
    : (products as any).toSorted((product1: Product, product2: Product) => product2.price - product1.price);
}

export const getCartItemCount = (items: CartItemsType[]) =>
  items.reduce((prevValue, currentItem) => prevValue + currentItem.quantity, 0);

export function getCartSubtotal(items: CartItemsType[]) {
  const subtotal = items.reduce((prev, current) => prev + current.product.price * current.quantity, 0);
  return formatPrice(subtotal);
}

export function getStoredValue(key: string) {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
}

export function saveValueToLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

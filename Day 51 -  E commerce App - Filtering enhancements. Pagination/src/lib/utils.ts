import { Product } from "@/types";
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

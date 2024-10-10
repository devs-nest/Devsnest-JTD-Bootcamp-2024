import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToRupee(price: number) {
  const rupee = (price * 84).toFixed(2);
  return new Intl.NumberFormat("en-IN").format(parseFloat(rupee));
}

export function formatPercentage(percentage: number) {
  return Math.round(percentage);
}

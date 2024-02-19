import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercent(percent: number): number {
  return Number(percent.toFixed(2));
}

export function getClusterSize() {
  return process.env.NODE_ENV === "development" ? 20 : 200;
}

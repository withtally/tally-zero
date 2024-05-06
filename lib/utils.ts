import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "../env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercent(percent: number): number {
  return Number(percent.toFixed(2));
}

export const CLUSTER_SIZE =
  env.NEXT_PUBLIC_NODE_ENV === "development" ? 20 : 300;

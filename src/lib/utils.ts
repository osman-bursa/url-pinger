import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => { setTimeout(resolve, ms) })
}

export function getRelativeTime(lastChecked?: string | Date) {
  if (!lastChecked)
    return "";

  const now = new Date().getTime()
  const diff = Math.floor((now - new Date(lastChecked).getTime()) / 1000)

  if (diff < 60) {
    return `${diff} sec ago`
  } else if (diff < 3600) {
    const mins = Math.floor(diff / 60)
    return `${mins} min ago`
  } else {
    const hours = Math.floor(diff / 3600)
    return `${hours} hr ago`
  }
}
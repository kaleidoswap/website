// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Opens a URL in an external browser window
 */
export function openExternalLink(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer')
}
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

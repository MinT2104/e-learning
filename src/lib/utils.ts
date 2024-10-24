import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const isLogin = () => {
  let token = getCookie('_at')
  if (token) return true
  else return false
}

export const logOut = () => {
  deleteCookie('_at')
  deleteCookie('_status')
  localStorage.removeItem('localUser')
  setTimeout(() => document.location.replace(import.meta.env.VITE_DOMAIN_NAME || 'http://localhost:5173'), 1000)
}

export const deleteCookie = (name: string) => {
  document.cookie = name + '=; Max-Age=-99999999;';
}
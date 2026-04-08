// Navigation utility for transitional period
// Eventually replace with Next.js router/Link

export const BASE_PATH = process.env.NODE_ENV === "production" ? "/276holdings-website" : "";

export function navigateTo(page: string): void {
  const path = page === "home" ? "/" : `/${page}`;
  window.location.href = `${BASE_PATH}${path}`;
}

// Route mapping
export const routes = {
  home: "/",
  flowpay: "/flowpay",
  flowscore: "/flowscore",
  flowpoint: "/flowpoint",
  about: "/about",
  contact: "/contact",
  faq: "/faq",
  esg: "/esg",
  notices: "/notices",
  terms: "/terms",
  privacy: "/privacy",
  admin: "/admin",
} as const;

export type PageId = keyof typeof routes;

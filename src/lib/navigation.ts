// Navigation utility for transitional period
// Eventually replace with Next.js router/Link

export function createSetPage(): (page: string) => void {
  return (page: string) => {
    const url = page === "home" ? "/" : `/${page}`;
    window.location.href = url;
  };
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
  admin: "/admin",
} as const;

export type PageId = keyof typeof routes;

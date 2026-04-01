"use client";
import { usePathname } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Foot from "@/components/layout/Footer";
import NoticePopup from "@/components/home/NoticePopup";
import { navigateTo } from "@/lib/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Map pathname to page ID for Nav highlighting
  const pageMap: Record<string, string> = {
    "/": "home",
    "/flowpay": "flowpay",
    "/flowscore": "flowscore",
    "/flowpoint": "flowpoint",
    "/about": "about",
    "/contact": "contact",
    "/faq": "faq",
    "/esg": "esg",
    "/notices": "notices",
    "/terms": "terms",
    "/admin": "admin",
  };

  const currentPage = pageMap[pathname] || "home";

  return (
    <>
      <Nav setPage={navigateTo} current={currentPage} />
      <main>{children}</main>
      <Foot setPage={navigateTo} />
      {pathname === "/" && <NoticePopup />}
    </>
  );
}

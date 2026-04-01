"use client";
import { useState, useEffect } from "react";
import { DEFAULT_FAQS } from "@/data/faqs";

export function useFaqs() {
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = localStorage.getItem("faq-data");
        if (stored) setFaqs(JSON.parse(stored));
        else localStorage.setItem("faq-data", JSON.stringify(DEFAULT_FAQS));
      } catch {}
      setLoaded(true);
    })();
  }, []);

  const save = async (next: typeof DEFAULT_FAQS) => {
    setFaqs(next);
    try { localStorage.setItem("faq-data", JSON.stringify(next)); } catch {}
  };

  return { faqs, loaded, save };
}

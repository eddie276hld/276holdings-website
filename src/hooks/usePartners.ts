"use client";
import { useState, useEffect } from "react";
import { DEFAULT_PARTNERS } from "@/data/partners";

export function usePartners() {
  const [partners, setPartners] = useState(DEFAULT_PARTNERS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = localStorage.getItem("partners-data");
        if (stored) setPartners(JSON.parse(stored));
        else localStorage.setItem("partners-data", JSON.stringify(DEFAULT_PARTNERS));
      } catch {}
      setLoaded(true);
    })();
  }, []);

  const save = async (next: typeof DEFAULT_PARTNERS) => {
    setPartners(next);
    try { localStorage.setItem("partners-data", JSON.stringify(next)); } catch {}
  };

  return { partners, loaded, save };
}

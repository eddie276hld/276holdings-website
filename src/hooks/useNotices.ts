"use client";
import { useState, useEffect } from "react";
import { DEFAULT_NOTICES } from "@/data/notices";

export function useNotices() {
  const [notices, setNotices] = useState(DEFAULT_NOTICES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = localStorage.getItem("notices-data");
        if (stored) setNotices(JSON.parse(stored));
        else localStorage.setItem("notices-data", JSON.stringify(DEFAULT_NOTICES));
      } catch {}
      setLoaded(true);
    })();
  }, []);

  const save = async (next: typeof DEFAULT_NOTICES) => {
    setNotices(next);
    try { localStorage.setItem("notices-data", JSON.stringify(next)); } catch {}
  };

  return { notices, loaded, save };
}

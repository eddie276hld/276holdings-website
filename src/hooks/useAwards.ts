"use client";
import { useState, useEffect } from "react";
import { DEFAULT_AWARDS, Award } from "@/data/awards";

export function useAwards() {
  const [awards, setAwards] = useState<Award[]>(DEFAULT_AWARDS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = localStorage.getItem("awards-data");
        if (stored) setAwards(JSON.parse(stored));
        else localStorage.setItem("awards-data", JSON.stringify(DEFAULT_AWARDS));
      } catch {}
      setLoaded(true);
    })();
  }, []);

  const save = async (next: Award[]) => {
    setAwards(next);
    try { localStorage.setItem("awards-data", JSON.stringify(next)); } catch {}
  };

  return { awards, loaded, save };
}

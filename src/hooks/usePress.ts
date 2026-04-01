"use client";
import { useState, useEffect } from "react";
import { DEFAULT_PRESS } from "@/data/press";

export function usePress() {
  const [press, setPress] = useState(DEFAULT_PRESS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = localStorage.getItem("press-data");
        if (stored) setPress(JSON.parse(stored));
        else localStorage.setItem("press-data", JSON.stringify(DEFAULT_PRESS));
      } catch {}
      setLoaded(true);
    })();
  }, []);

  const save = async (next: typeof DEFAULT_PRESS) => {
    setPress(next);
    try { localStorage.setItem("press-data", JSON.stringify(next)); } catch {}
  };

  return { press, loaded, save };
}

"use client";
import { useState, useEffect } from "react";
import { DEFAULT_HISTORY } from "@/data/history";

export function useHistory() {
  const [history, setHistory] = useState(DEFAULT_HISTORY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = localStorage.getItem("history-data");
        if (stored) setHistory(JSON.parse(stored));
        else localStorage.setItem("history-data", JSON.stringify(DEFAULT_HISTORY));
      } catch {}
      setLoaded(true);
    })();
  }, []);

  const save = async (next: typeof DEFAULT_HISTORY) => {
    setHistory(next);
    try { localStorage.setItem("history-data", JSON.stringify(next)); } catch {}
  };

  return { history, loaded, save };
}

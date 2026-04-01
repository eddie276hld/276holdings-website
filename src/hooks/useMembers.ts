"use client";
import { useState, useEffect } from "react";
import { DEFAULT_MEMBERS } from "@/data/members";

export function useMembers() {
  const [members, setMembers] = useState(DEFAULT_MEMBERS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = localStorage.getItem("members-data");
        if (stored) {
          let data = JSON.parse(stored);
          // Deduplicate by name
          const seen = new Set<string>();
          const deduped = data.filter((m: any) => {
            if (seen.has(m.nm)) return false;
            seen.add(m.nm);
            return true;
          });
          if (deduped.length < data.length) {
            localStorage.setItem("members-data", JSON.stringify(deduped));
          }
          setMembers(deduped);
        } else {
          localStorage.setItem("members-data", JSON.stringify(DEFAULT_MEMBERS));
        }
      } catch {}
      setLoaded(true);
    })();
  }, []);

  const save = async (next: typeof DEFAULT_MEMBERS) => {
    setMembers(next);
    try { localStorage.setItem("members-data", JSON.stringify(next)); } catch {}
  };

  return { members, loaded, save };
}

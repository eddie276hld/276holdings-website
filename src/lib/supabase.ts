import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Storage helper for transitional period (persistent storage → Supabase)
export const storage = {
  async get(key: string) {
    try {
      const r = await (window as any).storage?.get(key);
      return r?.value ? JSON.parse(r.value) : null;
    } catch {
      return null;
    }
  },
  async set(key: string, data: any) {
    try {
      await (window as any).storage?.set(key, JSON.stringify(data));
    } catch {}
  },
};

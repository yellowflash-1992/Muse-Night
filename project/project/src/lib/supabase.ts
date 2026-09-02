import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type LiteraryCategory = "poetry" | "prose" | "book";

export interface LiteraryPiece {
  id: string;
  title: string;
  category: LiteraryCategory;
  body: string;
  excerpt: string | null;
  author_name: string;
  cover_color: string;
  tags: string[];
  published: boolean;
  created_at: string;
}

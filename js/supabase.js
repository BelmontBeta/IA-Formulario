import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://jgigvjkyezvdffvbefnp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnaWd2amt5ZXp2ZGZmdmJlZm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjYyMzMsImV4cCI6MjEwMzM0MjIzM30.4HiEyFtG7vlB29pJH_cgJklTU8mwqzcXiyGBYxjmF9k";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
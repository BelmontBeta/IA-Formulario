import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://buypoclnuewxbdfmakji.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1eXBvY2xudWV3eGJkZm1ha2ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNjQwMDMsImV4cCI6MjEwMzk0MDAwM30.SXcEuCkZfDO280pScY1E5YBx4OIZTKdoA3h99MOXNic";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
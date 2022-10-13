import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ussmhjyywpndzbloaezb.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzc21oanl5d3BuZHpibG9hZXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMxODQyMDMsImV4cCI6MTk3ODc2MDIwM30.IhtBR3q9f0yx0f2_4qjmjiQUgB7moU9TlfAyAzvaxxY
export const supabase = createClient(supabaseUrl, supabaseKey);

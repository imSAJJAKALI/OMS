import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl,supabaseKey);

export const verifySupabaseConnection = async () => {
  try {
   
    const { error } = await supabase.auth.getSession(); 

    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      return false;
    }

    console.log('✅ Supabase connected');
    return true;
  } catch (err) {
    console.error('❌ Error verifying Supabase:', err.message);
    return false;
  }
};

export default supabase;


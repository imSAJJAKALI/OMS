import bcrypt from "bcrypt";
import supabase from "../src/config/connectDB.js";


const createAdmin = async () => {

  const hashPassword = await bcrypt.hash("Admin@123", 10);
  const { error } = await supabase
    .from("admin")
    .insert({
      full_name: "Super Admin",
      email: "admin@oms.com",
      password: hashPassword,
      is_admin: true,
    });

    if(error){
        console.log('❌ Failed to create admin:', error.message);
    }else{
       console.log('✅ Admin user created successfully!');
    }

};

createAdmin();

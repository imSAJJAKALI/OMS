import Fastify from "fastify";
import dotenv from "dotenv"
import { verifySupabaseConnection } from "./src/config/connectDB.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import adminAuthRoutes from "./src/routes/adminAuthRoute.js";
import adminProductsRoutes from "./src/routes/adminProductsRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import cors from "@fastify/cors"

dotenv.config()

fastify.register(cors,{
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
  credentials: true 
})

const fastify = Fastify({logger:true});

fastify.get('/', async (request, reply) => {
  return { message: 'Hello from Fastify ES module!' };
});

fastify.register(authRoutes);
fastify.register(userRoutes);
fastify.register(adminAuthRoutes);
fastify.register(adminProductsRoutes);
fastify.register(orderRoutes);

const start = async()=>{
    const connected = await verifySupabaseConnection();
    if(!connected){
        console.log('Exiting due to supabase connection failure');
        process.exit(1);
    }
    try {
        await fastify.listen({port:process.env.PORT},()=>{
            console.log("Server is running on port 8080");
        })
    } catch (error) {
        fastify.log.error(error);
        process.exit(1)

    }
}

start();

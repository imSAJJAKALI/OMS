import { protect } from "../middleware/authMiddleware.js"

async function userRoutes (fastify,options){
   fastify.get("/user",{preHandler: protect},async(req,res)=>{
    return {message: "user can read this data"}
   })
}

export default userRoutes;
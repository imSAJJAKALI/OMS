import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import supabase from '../config/connectDB.js';
import { adminLoginSchema } from '../schema/adminSchema.js'; 

async function adminAuthRoutes(fastify, options) {
  fastify.post('/admin/login', { schema: adminLoginSchema }, async (request, reply) => {
    const { email, password } = request.body;

    const { data: user, error } = await supabase
      .from('admin')
      .select('*')
      .eq('email', email)
      .eq('is_admin', true)
      .single();

    if (error || !user) {
      return reply.code(400).send({ message: 'Invalid admin credentials.' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return reply.code(400).send({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    return reply.send({ message: 'Admin login successful.', token });
  });
}

export default adminAuthRoutes;

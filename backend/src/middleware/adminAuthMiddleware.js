import jwt from 'jsonwebtoken';
import supabase from '../config/connectDB.js';

export const adminAuth = async (request, reply) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.code(401).send({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { data: user, error } = await supabase
      .from('admin')
      .select('*')
      .eq('id', decoded.userId)
      .single();

      console.log(error,user)

    if (error || !user || !user.is_admin) {
      return reply.code(403).send({ message: 'Access denied: Not an admin' });
    }
    

    request.user = user;
  } catch (err) {
    return reply.code(401).send({ message: 'Invalid token' });
  }
};

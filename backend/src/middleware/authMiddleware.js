import jwt from 'jsonwebtoken';
import supabase from '../config/connectDB.js'; 

export async function protect(request, reply) {
  try {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return reply.status(401).send({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return reply.status(401).send({ message: 'Unauthorized: No token provided' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user data from Supabase by id (assuming 'id' in token payload)
    const { data: user, error } = await supabase
      .from('users')
      .select('-password') // supabase doesn't support exclude, fetch all and delete password later
      .eq('id', decoded.userId || decoded.id)
      .single();

    if (error || !user) {
      return reply.status(401).send({ message: 'Unauthorized: User not found' });
    }

    // Remove password before attaching user to request
    delete user.password;

    // Attach user to request
    request.user = user;

  } catch (err) {
    return reply.status(401).send({ message: 'Invalid token' });
  }
}

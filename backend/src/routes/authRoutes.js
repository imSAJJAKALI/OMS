// routes/authRoutes.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import supabase from "../config/connectDB.js";
import { userSchema } from "../schema/userSchema.js";

async function authRoutes(fastify, options) {
  // Register
  fastify.post('/register', async (request, reply) => {
  const { full_name, email, password } = request.body;

  if (!full_name || !email || !password) {
    return reply.code(400).send({ message: 'All fields are required.' });
  }

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('users') // make sure this table exists
    .select('email')
    .eq('email', email)
    .single();

  if (existingUser) {
    return reply.code(400).send({ message: 'Email already registered.' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user
  const { data, error, status, statusText } = await supabase
    .from('users') // make sure this is correct
    .insert({
      full_name,
      email,
      password: hashedPassword
    });

  if (error) {
    console.error('Supabase Insert Error:', error);
    return reply.code(500).send({
      message: 'Error creating user.',
      error,
      status,
      statusText
    });
  }

  return reply.code(201).send({ message: 'User registered successfully.' });
});


  // Login
  fastify.post("/login", async (request, reply) => {
    const { email, password } = request.body;

    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !user) {
        return reply.code(400).send({ message: "Invalid credentials." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return reply.code(400).send({ message: "Invalid credentials." });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return reply.code(200).send({ message: "Login successful.", token });
    } catch (err) {
      console.error("Login Error:", err);
      return reply.code(500).send({ message: "Internal server error." });
    }
  });
}

export default authRoutes;

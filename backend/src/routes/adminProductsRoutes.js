import { productSchema } from '../schema/productSchema.js'; 
import supabase from '../config/connectDB.js';

async function adminProductsRoutes(fastify, options) {
  // GET all products
  fastify.get('/admin/products', async (req, reply) => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) return reply.code(500).send({ message: 'Failed to fetch products', error });
    reply.send(data);
  });

  // GET single product
  fastify.get('/admin/product/:id', async (req, reply) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) return reply.code(404).send({ message: 'Product not found', error });
    reply.send(data);
  });

  // CREATE new product
  fastify.post('/admin/product', { schema: productSchema }, async (req, reply) => {
    const { data, error } = await supabase.from('products').insert([req.body]).select().single();
    if (error) return reply.code(500).send({ message: 'Failed to create product', error });
    reply.code(201).send(data);
  });

  // UPDATE product
  fastify.put('/admin/product/:id', async (req, reply) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('products').update(req.body).eq('id', id).select().single();
    if (error) return reply.code(500).send({ message: 'Failed to update product', error });
    reply.send(data);
  });

  // DELETE product
  fastify.delete('/admin/product/:id', async (req, reply) => {
    const { id } = req.params;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) return reply.code(500).send({ message: 'Failed to delete product', error });
    reply.send({ message: 'Product deleted successfully' });
  });
}

export default adminProductsRoutes;

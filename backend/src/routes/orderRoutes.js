import { protect } from "../middleware/authMiddleware.js";
import supabase from "../config/connectDB.js";
import { adminAuth } from "../middleware/adminAuthMiddleware.js";

export const orderSchema = {
  body: {
    type: "object",
    required: ["totalPrice", "items", "address", "payment", "status"],
    properties: {
      totalPrice: { type: "number" },
      items: {
        type: "array",
        items: {
          type: "object",
          required: ["productId", "quantity"],
          properties: {
            productId: { type: "string" },
            quantity: { type: "number" },
          },
        },
      },
      address: {
        type: "object",
        required: [
          "fullName",
          "phone",
          "street",
          "city",
          "state",
          "country",
          "zipCode",
        ],
        properties: {
          fullName: { type: "string" },
          phone: { type: "string" },
          street: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          country: { type: "string" },
          zipCode: { type: "string" },
        },
      },
      payment: {
        type: "object",
        required: ["method", "status"],
        properties: {
          method: { type: "string" },
          status: { type: "string" },
        },
      },
      status: { type: "string" },
    },
  },
};

async function orderRoutes(fastify, options) {
  // Create Order
  fastify.post(
    "/orders",
    { preHandler: protect, schema: orderSchema },
    async (req, res) => {
      const userId = req.user?.id;
      const { totalPrice, items, address, payment, status } = req.body;
      console.log(userId)
      try {
        const { error } = await supabase.from("orders").insert([
          {
            user_id: userId,
            total_price: totalPrice,
            items,
            address,
            payment,
            status: status || "Placed",
          },
        ]);

        if (error) throw error;

        return res.code(201).send({ message: "Order placed successfully." });
      } catch (err) {
        return res
          .code(500)
          .send({ message: "Failed to create order", error: err.message });
      }
    }
  );

  // Get all orders for logged-in user
  fastify.get("/orders", { preHandler: protect }, async (req, res) => {
    const userId = req.user?.id;

    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return res.send(data);
    } catch (err) {
      return res
        .code(500)
        .send({ message: "Failed to fetch orders", error: err.message });
    }
  });

  // Get order by ID (only if belongs to user)
  fastify.get("/orders/:id", { preHandler: protect }, async (req, res) => {
    const userId = req.user?.id;
    const orderId = req.params.id;

    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .eq("user_id", userId)
        .single();

      if (error) throw error;

      return res.send(data);
    } catch (err) {
      return res.code(404).send({ message: "Order not found", error: err.message });
    }
  });

  // Delete order by ID (only if belongs to user)
  fastify.delete("/orders/:id", { preHandler: protect }, async (req, res) => {
    const userId = req.user?.id;
    const orderId = req.params.id;

    try {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId)
        .eq("user_id", userId);

      if (error) throw error;

      return res.send({ message: "Order deleted successfully" });
    } catch (err) {
      return res
        .code(500)
        .send({ message: "Failed to delete order", error: err.message });
    }
  });

  fastify.patch("/orders/:id", { preHandler: adminAuth }, async (req, res) => {
  const userId = req.user?.id;
  const orderId = req.params.id;
  const updatedFields = req.body;

  try {
    // Validate that user owns the order
    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("id")
      .eq("id", orderId)
      .eq("user_id", userId)
      .single();

    if (fetchError || !order) {
      return res.code(404).send({ message: "Order not found or unauthorized" });
    }

    // Update order fields
    const { error: updateError } = await supabase
      .from("orders")
      .update(updatedFields)
      .eq("id", orderId);

    if (updateError) throw updateError;

    return res.send({ message: "Order updated successfully" });
  } catch (err) {
    return res
      .code(500)
      .send({ message: "Failed to update order", error: err.message });
  }
});

}

export default orderRoutes;

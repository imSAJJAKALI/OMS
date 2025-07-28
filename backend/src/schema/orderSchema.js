export const orderSchema = {
  create: {
    body: {
      type: 'object',
      required: ['userId', 'totalPrice', 'items', 'address', 'payment', 'status'],
      properties: {
        userId: { type: 'string' },
        totalPrice: { type: 'number' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            required: ['productId', 'quantity'],
            properties: {
              productId: { type: 'string' },
              quantity: { type: 'number' }
            }
          }
        },
        address: {
          type: 'object',
          required: ['fullName', 'phone', 'street', 'city', 'state', 'country', 'zipCode'],
          properties: {
            fullName: { type: 'string' },
            phone: { type: 'string' },
            street: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            country: { type: 'string' },
            zipCode: { type: 'string' }
          }
        },
        payment: {
          type: 'object',
          required: ['method', 'status'],
          properties: {
            method: { type: 'string' },   // e.g., 'CashOnDelivery'
            status: { type: 'string' }    // e.g., 'Pending'
          }
        },
        status: { type: 'string' }  // e.g., 'Placed', 'Shipped', etc.
      }
    }
  }
};

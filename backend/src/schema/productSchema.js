export const productSchema = {
  body: {
    type: 'object',
    required: ['title', 'description', 'price', 'discount', 'category', 'brand', 'thumbnail', 'images'],
    properties: {
      title: { type: 'string', minLength: 1 },
      description: { type: 'string', minLength: 1 },
      price: { type: 'number', minimum: 0 },
      discount: { type: 'number', minimum: 0, maximum: 100 },
      category: { type: 'string', minLength: 1 },
      brand: { type: 'string', minLength: 1 },
      thumbnail: { type: 'string', format: 'uri' }, 
      images: {
        type: 'array',
        items: { type: 'string', format: 'uri' }, 
        minItems: 1
      },
      stock: { type: 'integer', minimum: 0, default: 0 }, 
      is_active: { type: 'boolean', default: true } 
    },
    additionalProperties: false
  }
};

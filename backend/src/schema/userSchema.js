export const userSchema = {
  body: {
    type: 'object',
    required: ['full_name', 'email', 'password'],
    properties: {
      full_name: { type: 'string', minLength: 1 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 },
    }
  }
};


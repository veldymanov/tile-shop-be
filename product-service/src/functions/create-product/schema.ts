export default {
  type: "object",
  properties: {
    sku: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    count: { type: 'number' }
  },
  required: ['title', 'description', 'price', 'count']
} as const;

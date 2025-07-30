'use client';

import { useState, useMemo } from 'react';

const sampleData = [
  {
    id: 1,
    created_at: '2025-07-28T04:47:38.867397+00:00',
    title: 'Wireless Earbuds',
    description: 'High-quality Bluetooth earbuds with noise cancellation.',
    price: 2999.99,
    discount: 10,
    category: 'Electronics',
    brand: 'SoundPro',
    thumbnail: 'https://cdn.example.com/product1-thumb.jpg',
    images: '["https://cdn.example.com/product1-1.jpg","https://cdn.example.com/product1-2.jpg"]',
    is_active: true,
    stock: 20,
  },
  {
    id: 2,
    created_at: '2025-07-29T10:15:00.000000+00:00',
    title: 'Smart Watch',
    description: 'Track your fitness with style.',
    price: 4999.0,
    discount: 5,
    category: 'Accessories',
    brand: 'TechTime',
    thumbnail: 'https://cdn.example.com/product2-thumb.jpg',
    images: '["https://cdn.example.com/product2-1.jpg"]',
    is_active: true,
    stock: 15,
  },
];

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const categories = ['All', ...new Set(sampleData.map((item) => item.category))];

  const filteredProducts = useMemo(() => {
    let data = [...sampleData];

    // Search
    if (searchTerm) {
      data = data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter && categoryFilter !== 'All') {
      data = data.filter((item) => item.category === categoryFilter);
    }

    // Sort
    if (sortOrder === 'priceLowHigh') {
      data.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'priceHighLow') {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [searchTerm, sortOrder, categoryFilter]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🛍️ Shop All Products
      </h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 border rounded-lg w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Category filter */}
        <select
          className="px-4 py-2 border rounded-lg w-full md:w-1/4"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="px-4 py-2 border rounded-lg w-full md:w-1/4"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const images = JSON.parse(product.images || '[]');
          return (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-4"
            >
              <img
                src={product.thumbnail || images[0]}
                alt={product.title}
                className="rounded-lg object-cover w-full h-60 mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
              <p className="text-gray-600 text-sm">{product.brand}</p>
              <p className="text-indigo-600 font-bold mt-2">
                ₹{product.price.toFixed(2)}{' '}
                <span className="text-sm text-gray-500 line-through">
                  ₹{(product.price / (1 - product.discount / 100)).toFixed(2)}
                </span>
              </p>
              <p className="text-green-600 text-sm">{product.stock} in stock</p>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-12">No products found.</p>
      )}
    </div>
  );
};

export default Page;

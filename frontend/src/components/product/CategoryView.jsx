import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import ProductCard from './ProductCard';

const CategoryView = () => {
  const { products, categories, activeCategorySlug, navigateTo } = useStore();
  const [sortBy, setSortBy] = useState('featured');

  const currentCategory = categories.find(c => c.slug === activeCategorySlug);
  const categoryTitle = currentCategory ? currentCategory.name : (activeCategorySlug ? activeCategorySlug.replace(/-/g, ' ').toUpperCase() : 'All Collections');
  const categoryDesc = currentCategory ? currentCategory.description : 'Explore our premium handpicked collection';

  let filtered = products.filter(p => {
    if (p.status === 'deactivated') return false;
    if (!activeCategorySlug || activeCategorySlug === 'all') return true;
    return p.category === activeCategorySlug;
  });

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return (
    <div className="section-container" style={{ padding: '36px 20px', minHeight: '60vh' }}>
      {/* Breadcrumb & Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
          <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} style={{ color: 'var(--color-primary)' }}>Home</a>
          <span style={{ margin: '0 8px' }}>/</span>
          <span>{categoryTitle}</span>
        </div>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => navigateTo('home')}
          style={{ padding: '6px 14px', fontSize: '0.82rem', borderRadius: '6px' }}
        >
          <i className="fa-solid fa-arrow-left"></i> All Categories
        </button>
      </div>

      {/* Category Header */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px 28px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: '#1A253C', margin: '0 0 6px 0', fontFamily: 'var(--font-serif)' }}>{categoryTitle}</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{categoryDesc}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{filtered.length} products</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#fff' }}
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <i className="fa-solid fa-box-open" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '16px' }}></i>
          <h3>No items found in this category</h3>
          <p style={{ color: '#64748b' }}>Try exploring our other curated collections.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigateTo('home')}
            style={{ marginTop: '14px', padding: '10px 20px', borderRadius: '8px' }}
          >
            View All Products
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryView;

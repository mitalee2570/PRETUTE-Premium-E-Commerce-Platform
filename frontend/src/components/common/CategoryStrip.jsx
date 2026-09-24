import React from 'react';
import { useStore } from '../../context/StoreContext';
import { getAssetUrl } from '../../utils/imageUrl';

const CategoryStrip = () => {
  const { activeCategorySlug, navigateTo, categories } = useStore();

  const stripCategories = [
    {
      id: 'all',
      name: 'All Offers',
      slug: 'all',
      icon: 'fa-solid fa-fire',
      badge: 'Hot'
    },
    {
      id: 'baby-fashion',
      name: 'Baby & Kids',
      slug: 'baby-fashion',
      image: '/assets/prod_romper.png'
    },
    {
      id: 'wooden-toys',
      name: 'Montessori Toys',
      slug: 'wooden-toys',
      image: '/assets/prod_rainbow.png'
    },
    {
      id: 'baby-gear',
      name: 'Nursery & Gear',
      slug: 'baby-gear',
      image: '/assets/prod_stroller.png'
    },
    {
      id: 'maternity',
      name: 'Maternity Wear',
      slug: 'maternity',
      image: '/assets/prod_dress.png'
    },
    {
      id: 'diy-kit',
      name: 'DIY Kits',
      slug: 'diy-kit',
      image: '/assets/DIY KIT.jpg'
    },
    {
      id: 'resin-art',
      name: 'Resin Art',
      slug: 'resin-art',
      image: '/assets/Resin Art.jpg'
    },
    {
      id: 'candle',
      name: 'Candles & Aromas',
      slug: 'candle',
      image: '/assets/candle.jpg'
    },
    {
      id: 'decorative-shop',
      name: 'Decorative Shop',
      slug: 'decorative-shop',
      image: '/assets/Decorative Shop.jpg'
    },
    {
      id: 'corporate-gifts',
      name: 'Corporate Gifts',
      slug: 'corporate-gifts',
      image: '/assets/Corporate Gifts.jpg'
    },
    {
      id: 'home-decor',
      name: 'Home Decor',
      slug: 'home-decor',
      image: '/assets/Home Decor.jpg'
    },
    {
      id: 'treasure-keeps',
      name: 'Treasure Keeps',
      slug: 'treasure-keeps',
      image: '/assets/Treasure Keeps.jpg'
    }
  ];

  const handleCategoryClick = (e, slug) => {
    e.preventDefault();
    if (slug === 'all') {
      navigateTo('category', 'all');
    } else {
      navigateTo('category', slug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fk-category-strip" id="fkCategoryStrip" aria-label="Flipkart Category Navigation">
      <div className="fk-strip-container">
        {stripCategories.map((cat) => {
          const isActive = (activeCategorySlug === cat.slug) || (!activeCategorySlug && cat.slug === 'all');
          return (
            <a
              key={cat.id}
              href={`#category/${cat.slug}`}
              className={`fk-cat-item ${isActive ? 'active' : ''}`}
              onClick={(e) => handleCategoryClick(e, cat.slug)}
            >
              <div className="fk-cat-icon-wrap">
                {cat.badge && <span className="fk-cat-badge">{cat.badge}</span>}
                {cat.icon ? (
                  <i className={cat.icon} style={{ color: '#FF5B7F', fontSize: '1.4rem' }}></i>
                ) : (
                  <img src={getAssetUrl(cat.image)} alt={cat.name} loading="lazy" />
                )}
              </div>
              <span className="fk-cat-label">{cat.name}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryStrip;

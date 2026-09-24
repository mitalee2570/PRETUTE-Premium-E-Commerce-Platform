import React from 'react';
import { useStore } from '../../context/StoreContext';
import { getAssetUrl } from '../../utils/imageUrl';

const CategorySlider = () => {
  const { categories, navigateTo } = useStore();

  const activeCategories = categories.filter(c => c.status !== 'deactivated' && c.showOnHome !== false);

  return (
    <div className="category-scroll-section">
      <div className="section-container">
        <div className="section-header category-heading-center">
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div className="category-scroll-container" id="categoryScrollContainer">
          {activeCategories.map((cat) => {
            const imgSrc = getAssetUrl(cat.image);
            return (
              <a
                key={cat.id}
                href={`#category/${cat.slug}`}
                className="cat-scroll-card"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('category', cat.slug);
                }}
              >
                <div className="cat-img-wrapper">
                  <img src={imgSrc} alt={cat.name} loading="lazy" />
                </div>
                <span className="cat-name">{cat.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;

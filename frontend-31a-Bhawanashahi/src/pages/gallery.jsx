import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/gallery.css';
import NavBar from '../components/Navbar';

const images = {
  all: ['pg1.png', 'pg2.png', 'pg3.png', 'mg1.png', 'mg2.png', 'vg1.png', 'vg2.png', 'vg3.png'],
  photography: ['pg1.png', 'pg2.png', 'pg3.png'],
  makeup: ['mg1.png', 'mg2.png'],
  venue: ['vg1.png', 'vg2.png', 'vg3.png']
};

const Gallery = () => {
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleImageClick = (image) => {
    // Logic to navigate to the detail page or perform some action
    console.log(`${image} clicked`);
  };

  return (
   <>
   <NavBar/>
   <div className="gallery-container">
      <header className="gallery-header">
        <h1>Gallery</h1>
        <div className="categories">
          <button onClick={() => handleCategoryChange('all')}>Show all</button>
          <button onClick={() => handleCategoryChange('photography')}>Photography & Videography</button>
          <button onClick={() => handleCategoryChange('makeup')}>Makeup</button>
          <button onClick={() => handleCategoryChange('venue')}>Venue</button>
        </div>
      </header>
      <main className="gallery-main">
        <div className="image-grid">
          {images[category].map((image, index) => (
            <div className="image-item" key={index} onClick={() => handleImageClick(image)}>
              <img src={`/assets/images/${image}`} alt={`img-${index}`} />
            </div>
          ))}
        </div>
      </main>
    </div>
   </>
    
  );
};

export default Gallery;

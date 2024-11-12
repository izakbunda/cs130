import React, { useEffect, useState } from 'react';
import '../css/pet.css';
import { PetFactory } from './petFactories'; 

// Currently variants include Sharkie, Kittie, Froggie
const PetIcon = ({ name, level, exp, page, variant = 'Sharkie' }) => {
  const [isJumping, setIsJumping] = useState(false);

  const { petImage, isSpecial } = PetFactory(variant, level);

  useEffect(() => {
    if (isSpecial) {
      const interval = setInterval(() => {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 1000);
      }, 8000); 

      return () => clearInterval(interval);
    }
  }, [isSpecial]);

  const sizeClass = page === 'Landing' ? 'pet-large' : 'pet-small';

  return (
    <div className={`pet-container ${sizeClass}`}>
      <div className="pet-image-container">
        <img
          src={petImage}
          alt={`Pet - ${name}`}
          className={`pet-image ${isJumping ? 'jump' : ''}`} 
        />
        <div className="pet-shadow"></div> 
      </div>
      {page === 'Landing' && (
        <>
          <h2 className="pet-name">{name}</h2>
          <h5 className="pet-level">Level: {level}</h5>
        </>
      )}
    </div>
  );
};

export default PetIcon;

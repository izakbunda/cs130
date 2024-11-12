import React, { useEffect, useState } from 'react';
import '../css/pet.css';

const PetIcon = ({ name, level, exp, page }) => {
  const [isJumping, setIsJumping] = useState(false);

  let petImage;
  let isSharkieC = false;
  if (level >= 0 && level <= 8) {
    petImage = '../../public/SharkieA.png'; 
  } else if (level >= 9 && level <= 12) {
    petImage = '../../public/SharkieB.png'; 
  } else if (level >= 13) {
    petImage = '../../public/SharkieC.png';
    isSharkieC = true;
  }

  useEffect(() => {
    if (isSharkieC) {
      const interval = setInterval(() => {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 1000);
      }, 8000); 

      return () => clearInterval(interval);
    }
  }, [isSharkieC]);

  const sizeClass = page === 'Landing' ? 'pet-large' : 'pet-small';

  return (
    <div className={`pet-container ${sizeClass}`}>
      <div className="pet-image-container">
        <img
          src={petImage}
          alt={`Pet - ${name}`}
          className={`pet-image ${isJumping ? 'jump' : ''}`} 
        />
        <div className="pet-shadow"></div> {/* Shadow is a sibling of the image */}
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

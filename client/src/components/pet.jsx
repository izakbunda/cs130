import React from 'react';
import '../css/pet.css';

const PetIcon = ({ name, level, exp, page }) => {
  
  let petImage;
  if (level >= 0 && level <= 8) {
    petImage = '../../public/SharkieA.png'; 
  } else if (level >= 9 && level <= 12) {
    petImage = '../../public/SharkieB.png'; 
  } else if (level >= 13) {
    petImage = '../../public/SharkieC.png';
  }

  const sizeClass =
    page === 'Landing' ? 'pet-large' :  'pet-small'

  return (
    <div className={`pet-container ${sizeClass}`}>
      <img src={petImage} alt={`Pet - ${name}`} className="pet-image" />
      <h2 className="pet-name">{name}</h2>
      <h5 className="pet-level">Level: {level}</h5>
    </div>
  );
};

export default PetIcon;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/index.css";
import "../css/pet-page.css";
import Button from '../components/button';
import"../css/pet.css";

function PetPage() {
  const navigate = useNavigate();
  const [positionIndex, setPositionIndex] = useState(0);

  const pets = [
    { name: 'FroggieA', src: '../../public/FroggieA.png' },
    { name: 'SharkieA', src: '../../public/SharkieA.png' },
    { name: 'KittieA', src: '../../public/KittieA.png' },
  ];

  const positions = [
    { transform: 'translate(-120px, -20px) scale(0.9)', zIndex: 1 }, // Left-back
    { transform: 'translate(0, 0) scale(1)', zIndex: 4 }, // Center-forward
    { transform: 'translate(120px, -20px) scale(0.9)', zIndex: 2 }, // Right-back
  ];

  const handleRotate = () => {
    setPositionIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const handleNavigateToLanding = () => {
    navigate('/landing');
  };

  return (
    <div className="total-margin">
      <div className="pet-page-container">
        <h2 className="Center">Choose your pet</h2>
        <div className="pet-display-container">
          {pets.map((pet, index) => {
            // Calculate new position based on current index + rotation offset
            const newIndex = (index + positionIndex) % 3;
            const style = positions[newIndex];


            return (
              <div key={pet.name} style={{ ...style, position: 'absolute', transition: 'transform 1s ease-in-out, z-index 0s' }}>
                <div className="egg-shadow"></div> 
                <img
                  src={pet.src}
                  alt={pet.name}
                  className={`pet-egg`}
                  style={{ position: 'relative' }}
                />
              </div>
              );
          })}
        </div>
        <div className="in-line">
          <div className="child">
            <Button
              text="Rotate Pet"
              onClick={handleRotate}
              icon={<img src=".././public/Swap_Icon.svg" alt="icon" style={{ width: '20px', height: '20px' }} />}
            />
          </div>
          <div className="child">
            <Button
              text="Choose Pet"
              onClick={handleNavigateToLanding}
              icon={<img src=".././public/Egg_Icon.svg" alt="icon" style={{ width: '20px', height: '20px' }} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetPage;

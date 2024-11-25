import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/index.css";
import InfoGrid from "../components/row-grid";
import ProgressBar from "../components/progress-bar";
import PetIcon from "../components/pet";
import Button from "../components/button";
import MotivationalMessage from '../components/motivation';

function Landing() {
    const [samplePet, setSamplePet] = useState({
        name: 'Sharkie',
        level: 13, // Example starting level
        exp: 600, // Example starting EXP
    });
    const navigate = useNavigate(); // For navigation

    const handleNavigateToFolder = () => {
        navigate('/folder');
    };
    
    return (
        <div className="total-margin">
          <h1>Todogotchi</h1>
          <div className="landing-container">
            <InfoGrid />
            <ProgressBar currentExp={samplePet.exp} level={samplePet.level} page="Landing" />
            <PetIcon
              name={samplePet.name}
              level={samplePet.level}
              exp={samplePet.exp}
              page="Landing"
            />
            <Button 
                text="To-Do List" 
                onClick={handleNavigateToFolder} 
                icon={<img src=".././public/todo.svg" alt="icon" style={{ width: '20px', height: '20px' }} />} 
            />
            <MotivationalMessage />
          </div>
        </div>
    );
}

export default Landing;
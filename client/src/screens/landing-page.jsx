import { useState } from "react";
import "../css/index.css";
import InfoGrid from "../components/row-grid";
import { Box, LinearProgress } from '@mui/material';
import ProgressBar from "../components/progress-bar";
import PetIcon from "../components/pet";
import Button from "../components/button"

function Landing(){
    const [samplePet, setSamplePet] = useState({
        name: 'Sharkie',
        level: 13, // Example starting level
        exp: 600, // Example starting EXP
    });
    const handleClick = () => {
        console.log('Button clicked!');
    };
    
      return (
        <div className="total-margin" >
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
                onClick={handleClick} 
                icon={<img src=".././public/todo.svg" alt="icon" style={{ width: '20px', height: '20px' }} />} 
            />
          </div>
        </div>
      );
}
export default Landing;
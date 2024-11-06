import { useState } from "react";
import "../css/index.css";
import InfoGrid from "../components/row-grid";
import { Box, LinearProgress } from '@mui/material';
import ProgressBar from "../components/progress-bar";
import PetIcon from "../components/pet";

function Landing(){
    const [samplePet, setSamplePet] = useState({
        name: 'Sharkie',
        level: 13, // Example starting level
        exp: 600, // Example starting EXP
      });
    
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
          </div>
        </div>
      );
}
export default Landing;
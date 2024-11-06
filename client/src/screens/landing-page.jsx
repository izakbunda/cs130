import { useState } from "react";
import "../css/index.css";
import InfoGrid from "../components/row-grid";
import { Box, LinearProgress } from '@mui/material';
import ProgressBar from "../components/progress-bar";

function Landing(){
return(
    <div className='total-margin' >
        <h1> Todogotchi </h1>
            <div className="landing-container">
                <InfoGrid />
                <ProgressBar value={60} max={100} page="Landing" />
            </div>
        
        
    </div>
)
}
export default Landing;
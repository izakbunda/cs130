import { useState } from "react";
import "../css/index.css";
import Clock from '../components/clock'
import Weather from "../components/weather";
import InfoGrid from "../components/row-grid";
function Landing(){
return(
    <html>
        <h1> Todogotchi </h1>
        {/* <Clock />
        <Weather /> */}
        <InfoGrid />
        
        
    </html>
)
}
export default Landing;
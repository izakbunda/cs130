import {React, useState, useEffect} from "react";
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import "../css/index.css";

import Clock from '../components/clock'
import Weather from "../components/weather";

const InfoGrid = () => {
  const layoutConfig = [
    { i: "clock", x: 0, y: 0, w: 1, h: 1, static: true }, // put da clock on the left
    { i: "weather", x: 1, y: 0, w: 1, h: 1, static: true }, // weather on the right
  ];

  const gridProps = {
    className: "landing-grid",
    layout: layoutConfig,
    cols: 2, // columns in grid
    rowHeight: 36, 
    width: 398, // width of grid based on padding
  };

  return (
    <GridLayout {...gridProps} >
      <div key="clock">
        <Clock />
      </div>
      <div key="weather">
        <Weather />
      </div>
    </GridLayout>
  );
};

export default InfoGrid;
  
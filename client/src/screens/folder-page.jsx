import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import GridLayout from "react-grid-layout";
import "../css/index.css";
import "../css/folder-grid.css";
import ProgressBar from "../components/progress-bar";
import PetIcon from "../components/pet";
import Button from "../components/button";

function FolderPage() {
    const [samplePet] = useState({
        name: 'Sharkie',
        level: 13,
        exp: 600,
    });

    const navigate = useNavigate(); // For navigation

    // Layout configuration for GridLayout
    const layoutFolder = [
        { i: "pet", x: 0, y: 0, w: 4, h: 2, static: true },
        { i: "title", x: 4, y: 0, w: 8, h: 1, static: true },
        { i: "buttons", x: 12, y: 0, w: 4, h: 1, static: true },
        { i: "progress", x: 4, y: 1, w: 12, h: 1, static: true },
    ];

    const gridProps = {
        className: "folder-grid",
        layout: layoutFolder,
        cols: 16,
        rowHeight: 40, // Adjust row height as needed
        width: 406, // Adjust grid width as needed
    };

    return (
        <div className="folder-page-container">
            <GridLayout {...gridProps}>
                <div key="pet" className="grid-item">
                    <PetIcon
                        name={samplePet.name}
                        level={samplePet.level}
                        exp={samplePet.exp}
                        page="Folder"
                    />
                </div>
                <div key="title" className="grid-item">
                    <h2>TODOGOTCHI</h2>
                </div>
                <div key="buttons" className="grid-item">
                    <div className="button-container">
                    <Button
                        icon={<img src="../public/add_folder_icon.svg" alt="Add Folder Icon" style={{ width: '25px', height: '25px' }} />}
                        onClick={() => console.log('Add Folder clicked!')}
                        noOutline
                        className="folder-button large-icon"
                    />
                    <Button
                        icon={<img src="../public/home_icon.svg" alt="Home Icon" style={{ width: '25px', height: '25px' }} />}
                        onClick={() => navigate('/')} // Navigate back to LandingPage
                        noOutline
                        className="folder-button large-icon"
                    />
                    </div>
                </div>
                <div key="progress" className="grid-item">
                    <ProgressBar currentExp={samplePet.exp} level={samplePet.level} page="Folder" />
                </div>
            </GridLayout>
        </div>
    );
}

export default FolderPage;

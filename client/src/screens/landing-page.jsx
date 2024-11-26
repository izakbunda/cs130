import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/index.css";
import InfoGrid from "../components/row-grid";
import ProgressBar from "../components/progress-bar";
import PetIcon from "../components/pet";
import Button from "../components/button";
import MotivationalMessage from "../components/motivation";
import Pet from "../../../server/models/Pet";

function Landing() {
  const [pet, setPet] = useState({
    name: "placeholder",
    level: 0, // Example starting level
    exp: 0, // Example starting EXP
  });

  const navigate = useNavigate(); // For navigation

  const handleNavigateToFolder = () => {
    navigate("/folder");
  };

  useEffect(() => {
    const fetchPet = async (petId) => {
      try {
        const response = await fetch(`http://localhost:3001/pets/${petId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const petData = await response.json();
        console.log("Fetched pet from backend:", petData);

        // Save pet to localStorage for future use
        localStorage.setItem("pet", JSON.stringify(petData));

        // Update state
        setPet(petData);
      } catch (error) {
        console.error("Failed to fetch pet:", error);

        // TODO: WHAT SHOULD WE DO IF IT FAILS?
      }
    };

    const pet = localStorage.getItem("pet");

    if (!pet) {
      const pet_id = localStorage.getItem("pet_id");

      // Fetch pet from backend if not in localStorage
      fetchPet(pet_id);
    } else {
      console.log("Pet found in localStorage:", JSON.parse(pet));
      setPet(JSON.parse(pet));
    }
  }, [navigate]);

  return (
    <div className="total-margin">
      <h1>Todogotchi</h1>
      <div className="landing-container">
        <InfoGrid />
        <ProgressBar currentExp={pet.exp} level={pet.level} page="Landing" s />
        <PetIcon
          name={pet.name}
          level={pet.level}
          exp={pet.exp}
          page="Landing"
        />
        <Button
          text="To-Do List"
          onClick={handleNavigateToFolder}
          icon={
            <img
              src=".././public/todo.svg"
              alt="icon"
              style={{ width: "20px", height: "20px" }}
            />
          }
        />
        <MotivationalMessage />
      </div>
    </div>
  );
}

export default Landing;

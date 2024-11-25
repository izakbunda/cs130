import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/index.css";
import "../css/pet-page.css";
import Button from "../components/button";
import "../css/pet.css";

function PetPage() {
  const navigate = useNavigate();
  const [petName, setPetName] = useState("");
  const [missingName, setMissingName] = useState(false);
  const [positionIndex, setPositionIndex] = useState(0);

  const pets = [
    { name: "FroggieA", src: "../../public/FroggieA.png" },
    { name: "SharkieA", src: "../../public/SharkieA.png" },
    { name: "KittieA", src: "../../public/KittieA.png" },
  ];

  const positions = [
    { transform: "translate(-120px, -20px) scale(0.9)", zIndex: 1 }, // Left-back
    { transform: "translate(0, 0) scale(1)", zIndex: 4 }, // Center-forward
    { transform: "translate(120px, -20px) scale(0.9)", zIndex: 2 }, // Right-back
  ];

  const handleRotate = () => {
    setPositionIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  // const createPet = async () => {
  //   try {
  //     const userId = getUserId();
  //     const resp = await fetch(`http://localhost:3001/folders/${userId}`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name: folderInput }),
  //     });

  //     if (!resp.ok) {
  //       throw new Error(`Error: ${response.status} ${response.statusText}`);
  //     }

  //     const newFolder = await resp.json();
  //     console.log(newFolder);

  //     // update folders
  //     setFolders((prevFolders) => [...prevFolders, newFolder]);
  //   } catch (error) {
  //     alert("Failed to create folder. Please try again.");
  //     console.error("Error creating folder:", error);
  //   }
  // };

  const handleNavigateToLanding = () => {
    // first check if the pet is named
    if (petName) {
      setMissingName(false);
      // POST - createPet
      // createPet();
      // replace with pet type here
      navigate("/landing");
    } else {
      setMissingName(true);
    }
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
              <div
                key={pet.name}
                style={{
                  ...style,
                  position: "absolute",
                  transition: "transform 1s ease-in-out, z-index 0s",
                }}
              >
                <div className="egg-shadow"></div>
                <img
                  src={pet.src}
                  alt={pet.name}
                  className={`pet-egg`}
                  style={{ position: "relative" }}
                />
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "110px",
          }}
        >
          <input
            type="text"
            id="petName"
            value={petName}
            onChange={(e) => {
              setPetName(e.target.value);
              setMissingName(false);
            }}
            className="pet-name-input"
            placeholder="Name your pet"
          />

          {missingName ? (
            <p
              className="login-text"
              style={{ color: "red", alignSelf: "center", marginBottom: "3px" }}
            >
              Don't forget to name your pet!
            </p>
          ) : null}

          <div className="in-line">
            <div className="child" style={{ marginTop: "-17px" }}>
              <Button
                text="Rotate Pet"
                onClick={handleRotate}
                icon={
                  <img
                    src=".././public/Swap_Icon.svg"
                    alt="icon"
                    style={{ width: "20px", height: "20px" }}
                  />
                }
              />
            </div>
            <div className="child" style={{ marginTop: "-17px" }}>
              <Button
                text="Choose Pet"
                onClick={handleNavigateToLanding}
                icon={
                  <img
                    src=".././public/Egg_Icon.svg"
                    alt="icon"
                    style={{ width: "20px", height: "20px" }}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetPage;

import React, { useState } from 'react'
import '../css/pet.css'
import { PetFactory } from './petFactories'

import FroggieA from '../assets/FroggieA.png'
import FroggieB from '../assets/FroggieB.png'
import FroggieC from '../assets/FroggieC.png'
import SharkieA from '../assets/SharkieA.png'
import SharkieB from '../assets/SharkieB.png'
import SharkieC from '../assets/SharkieC.png'
import KittieA from '../assets/KittieA.png'
import KittieB from '../assets/KittieB.png'
import KittieC from '../assets/KittieC.png'

const assetMap = {
  Sharkie: [SharkieA, SharkieB, SharkieC],
  Froggie: [FroggieA, FroggieB, FroggieC],
  Kittie: [KittieA, KittieB, KittieC]
}

const getLevelIndex = (level) => {
  if (level <= 8) return 0
  if (level <= 12) return 1
  return 2
}

// Currently variants include Sharkie, Kittie, Froggie
const PetIcon = ({ name, level, exp, page, variant = 'Sharkie' }) => {
  const [isJumping, setIsJumping] = useState(false)

  const levelIndex = getLevelIndex(level)
  const petImage = assetMap[variant]?.[levelIndex] || assetMap['Sharkie'][0]

  //  jump when pet is clicked
  const handleJump = () => {
    if (!isJumping) {
      setIsJumping(true)
      setTimeout(() => setIsJumping(false), 1000)
    }
  }

  const sizeClass = page === 'Landing' ? 'pet-large' : 'pet-small'

  return (
    <div className={`pet-container ${sizeClass}`}>
      <div className="pet-image-container">
        <img
          src={petImage}
          alt={`Pet - ${name}`}
          className={`pet-image ${isJumping ? 'jump' : ''}`}
          onClick={handleJump}
        />
        <div className="pet-shadow"></div>
      </div>
      {page === 'Landing' && (
        <>
          <h2 className="pet-name">{name}</h2>
          <h5 className="pet-level">Level: {level}</h5>
        </>
      )}
    </div>
  )
}

export default PetIcon

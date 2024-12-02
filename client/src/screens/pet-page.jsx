import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/index.css'
import '../css/pet-page.css'
import Button from '../components/button'
import '../css/pet.css'

import Froggie from '../assets/FroggieA.png'
import Sharkie from '../assets/SharkieA.png'
import Kittie from '../assets/KittieA.png'
import Swap_Icon from '../assets/Swap_Icon.svg'
import Egg_Icon from '../assets/Egg_Icon.svg'

import BackButton from '../components/backButton'

function PetPage() {
  const navigate = useNavigate()
  const [petName, setPetName] = useState('')
  const [missingName, setMissingName] = useState(false)
  const [positionIndex, setPositionIndex] = useState(0)

  const pets = [
    { name: 'FroggieA', src: Froggie },
    { name: 'SharkieA', src: Sharkie },
    { name: 'KittieA', src: Kittie }
  ]

  const positions = [
    {
      // Left-back
      transform: 'translate(-120px, -20px) scale(0.9)',
      zIndex: 1,
      type: 'Sharkie'
    },
    {
      // Center-forward
      transform: 'translate(0, 0) scale(1)',
      zIndex: 4,
      type: 'Froggie'
    },
    {
      // Right-back
      transform: 'translate(120px, -20px) scale(0.9)',
      zIndex: 2,
      type: 'Kittie'
    }
  ]

  // logic to return user to landing screen if already has a pet
  useEffect(() => {
    // check first if logged in
    const token = localStorage.getItem('jwt')

    // if logged in
    if (token) {
      // check if user has already made pet
      const pet = localStorage.getItem('pet')

      if (pet) {
        console.log('already have a pet - go back to landing')
        // Redirect user to landing page or dashboard
        navigate('/landing')
      } else {
        console.log('ur good, keep making your pet')
      }
    } // if not logged in -> go back to login
    else {
      console.log('ur not even logged in!')
      navigate('/login')
    }
  }, [])

  const handleRotate = () => {
    setPositionIndex((prevIndex) => (prevIndex + 1) % 3)
  }

  const getUserId = () => {
    const userId = localStorage.getItem('user_id') // Replace "userId" with the actual key used to store it
    if (!userId) {
      console.error('User ID not found in local storage.')
      return null
    }
    return userId
  }

  const createPet = async () => {
    try {
      const userId = getUserId()
      const petType = positions[positionIndex].type

      if (!petName || !petType) {
        // alert("Please provide a valid pet name and type.");
        return
      }

      const resp = await fetch(`http://localhost:3001/pets/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: petName, type: petType })
      })

      if (!resp.ok) {
        console.log(resp)
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const newPet = await resp.json()
      console.log(newPet)

      localStorage.setItem('pet', JSON.stringify(newPet))
      localStorage.setItem('pet_id', newPet._id)
      // alert("Pet created successfully!");
    } catch (error) {
      // alert("Failed to create pet. Please try again.");
      console.error('Error creating pet:', error)
    }
  }

  const handleNavigateToLanding = async () => {
    if (petName) {
      setMissingName(false)

      try {
        console.log('creating pet')
        await createPet() // wait for pet creation to complete
        console.log("pet made, let's go")

        navigate('/landing') //
      } catch (error) {
        console.error('Error navigating to landing:', error)
        // alert("Failed to navigate. Please try again.");
      }
    } else {
      setMissingName(true)
    }
  }

  return (
    <div className="total-margin">
      <BackButton navigateTo={'/login'} />
      <BackButton navigateTo={'/landing'} />
      <div className="pet-page-container">
        <h2 className="Center">Choose your pet</h2>
        <div className="pet-display-container">
          {pets.map((pet, index) => {
            // Calculate new position based on current index + rotation offset
            const newIndex = (index + positionIndex) % 3
            const style = positions[newIndex]
            return (
              <div
                key={pet.name}
                style={{
                  ...style,
                  position: 'absolute',
                  transition: 'transform 1s ease-in-out, z-index 0s'
                }}
              >
                <div className="egg-shadow"></div>
                <img
                  src={pet.src}
                  alt={pet.name}
                  className={`pet-egg`}
                  style={{ position: 'relative' }}
                />
              </div>
            )
          })}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '110px'
          }}
        >
          <input
            type="text"
            id="petName"
            value={petName}
            onChange={(e) => {
              setPetName(e.target.value)
              setMissingName(false)
            }}
            className="pet-name-input"
            placeholder="Name your pet"
          />

          {missingName ? (
            <p
              className="login-text"
              style={{ color: 'red', alignSelf: 'center', marginBottom: '3px' }}
            >
              Don't forget to name your pet!
            </p>
          ) : null}

          <div className="in-line">
            <div className="child" style={{ marginTop: '-17px' }}>
              <Button
                text="Rotate Pet"
                onClick={handleRotate}
                icon={<img src={Swap_Icon} alt="icon" style={{ width: '20px', height: '20px' }} />}
              />
            </div>
            <div className="child" style={{ marginTop: '-17px' }}>
              <Button
                text="Choose Pet"
                onClick={handleNavigateToLanding}
                icon={<img src={Egg_Icon} alt="icon" style={{ width: '20px', height: '20px' }} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetPage

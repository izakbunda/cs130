import Pet from '../models/Pet.js'
import User from '../models/User.js'

// desc: create a new pet -- should only be done once per acc
// route: POST /pets/:userId
// access: private (TODO)
export const createPet = async (req, res) => {
  try {
    const { userId } = req.params
    const { name, type } = req.body

    // confirm data
    if (!userId || !name || !type) {
      return res.status(400).json({ message: 'Required fields missing' })
    }

    // check if user exists
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // create new pet
    const pet = new Pet({
      user: userId,
      name,
      type
    })

    // store new pet
    const savedPet = await pet.save()

    // add pet to user's pet arr
    user.pets.push(pet._id)
    await user.save()

    // send back new pet
    res.status(201).json(savedPet)

    console.log('success')
  } catch (error) {
    // console.log("error");
    res.status(500).json({ error: error.message })
  }
}

// desc: get pet
// route: GET /pets/:petId
// access: private (TODO)
export const getPet = async (req, res) => {
  try {
    const { petId } = req.params

    // confirm data
    if (!petId) {
      return res.status(400).json({ message: 'Pet ID required' })
    }

    // get pet
    const pet = await Pet.findById(petId).exec()
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' })
    }

    // send back pet
    res.status(200).json(pet)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// desc: update pet
// route: PATCH /pets/:petId
// access: private (TODO)
// export const updatePet = async (req, res) => {
//   try {
//     const { petId } = req.params;
//     const petData = req.body;

//     // confirm required data
//     if (!petId) {
//       return res.status(400).json({ message: "Pet ID required" });
//     }

//     // do we wanna do level calculation here??

//     // find pet and update it
//     const pet = await Pet.findByIdAndUpdate(petId, petData, {
//       new: true,
//     }).exec();

//     if (!pet) {
//       return res.status(404).json({ message: "Pet not found" });
//     }

//     // send back updated pet
//     res.status(200).json(pet);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const updatePet = async (req, res) => {
  try {
    const { petId } = req.params
    const updates = req.body // Allow any fields to be passed for updating

    // Confirm required data
    if (!petId) {
      return res.status(400).json({ message: 'Pet ID required' })
    }

    // Fetch the pet
    const pet = await Pet.findById(petId)
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' })
    }

    // If points are included in the update, calculate new level and experience
    if (updates.points !== undefined) {
      const BASE_EXP = 100
      const EXPONENT = 1.5
      const calculateRequiredExp = (level) => BASE_EXP * Math.pow(level, EXPONENT)

      let totalExp = pet.points + updates.points // Add or subtract points
      let newLevel = pet.level
      let maxExp = calculateRequiredExp(newLevel)

      // Handle level-up
      while (totalExp >= maxExp) {
        totalExp -= maxExp
        newLevel += 1
        maxExp = calculateRequiredExp(newLevel)
      }

      // Handle level-down
      while (totalExp < 0 && newLevel > 1) {
        newLevel -= 1
        maxExp = calculateRequiredExp(newLevel)
        totalExp += maxExp
      }

      // Update points and level
      pet.points = totalExp
      pet.level = newLevel
    }

    // Apply other updates (e.g., name, type)
    for (const key in updates) {
      if (key !== 'points') {
        pet[key] = updates[key]
      }
    }

    // Save updated pet
    const updatedPet = await pet.save()

    // Send back updated pet
    res.status(200).json(updatedPet)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

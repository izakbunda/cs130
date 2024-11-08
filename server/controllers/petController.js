import Pet from "../models/Pet.js";
import User from "../models/User.js";

// desc: create a new pet -- should only be done once per acc
// route: POST /pet/:userId
// access: private (TODO)
export const createPet = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name } = req.body;

        // confirm data 
        if (!userId || !name) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        // check if user exists
        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // create new pet
        const pet = new Pet({
            user: userId,
            name,
            // MAYBE NEED TO INIT POINTS + XP HERE
        })

        // store new pet
        const savedPet = await pet.save();

        // add pet to user's pet arr
        user.pets.push(pet._id);
        await user.save();

        // send back new pet
        res.status(201).json(savedPet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// desc: get pet 
// route: GET /pet/:petId
// access: private (TODO)
export const getPet = async (req, res) => {
    try {
        const { petId } = req.params;

        // confirm data
        if (!petId) {
            return res.status(400).json({ message: "Pet ID required" }); 
        }

        // get pet
        const pet = await Pet.findById(petId).exec();
        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        // send back pet
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// desc: update pet
// route: PATCH /pet/:petId
// access: private (TODO)
export const updatePet = async (req, res) => {
    try {
        const { petId } = req.params;
        const petData = req.body;

        // confirm required data
        if (!petId) {
            return res.status(400).json({ message: "Pet ID required" });
        }

        // do we wanna do level calculation here??

        // find pet and update it 
        const pet = await Pet.findByIdAndUpdate(petId, petData, {new: true}).exec();
        if (!pet) {
            return res.status(404).json({ message: "Pet not found" }); 
        }

        // send back updated pet
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
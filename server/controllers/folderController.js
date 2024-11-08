import Folder from "../models/Folder.js";
import User from "../models/User.js";

// desc: create a new folder
// route: POST /folders/:userId
// access: private (TODO)
export const createFolder = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name } = req.body;

        // confirm data
        if (!name || !userId) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        // check if user exists
        const user = await User.findById(userId).exec();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // create new folder
        const folder = new Folder({
            user: userId,
            name,
            notes: [], // all created folders start empty 
        })

        // store new folder
        const savedFolder = await folder.save();

        // add folder to user's folder arr
        user.folders.push(folder._id);
        await user.save();

        // send back new folder
        res.status(201).json(savedFolder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// desc: get all folders associated with user
// route: GET /folders/:userId
// access: private (TODO)
export const getFolders = async (req, res) => {
    try {
        const { userId } = req.params;

        // confirm data
        if (!userId) {
            return res.status(400).json({ message: "User ID required" });
        }

        // get list of folders from user
        const user = await User.findById(userId).populate("folders").exec();
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // send back list of folders
        res.status(200).json(user.folders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// desc: update a folder
// route: PATCH /folders/:folderId
// access: private (TODO)
export const updateFolder = async (req, res) => {
    try {
        const { folderId } = req.params;
        const { name } = req.body; 

        // confirm data
        if (!folderId || !name) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        // check if folder exists
        const folder = await Folder.findById(folderId).exec();
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        // update folder
        folder.name = name;
        await folder.save();

        // send back the updated folder
        res.status(200).json(folder);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// desc: delete a folder
// route: DELETE /folders/:folderId
// access: private (TODO)
export const deleteFolder = async (req, res) => {
    try {
        const { folderId } = req.params;
        
        // confirm data
        if (!folderId) {
            return res.status(400).json({ message: "Folder ID required" });
        }

        // check if folder exists
        const folder = await Folder.findById(folderId).exec();
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        // delete folder -- triggers pre-delete hook
        await folder.deleteOne();

        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
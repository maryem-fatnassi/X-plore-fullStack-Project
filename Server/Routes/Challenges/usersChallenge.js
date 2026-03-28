// routes/challengeRoutes.js
const express = require('express');
const router = express.Router();
const Challenge = require('../../Models/RegisteredUsers/challengesModel');

// Route to get participants of a specific challenge
router.get('/:challengeId/participants', async (req,res)=>{
     try {
            const { challengeId } = req.params;
    
            // Find challenge and populate the joinedUsers array
            // We select only the necessary fields from the User model
            const challenge = await Challenge.findById(challengeId)
                .populate({
                    path: 'joinedUsers',
                    select: 'userName email avatar' 
                });
    
            if (!challenge) {
                return res.status(404).json({ message: "Challenge not found" });
            }
    
            // Return only the populated users array
            res.status(200).json(challenge.joinedUsers);
        } catch (error) {
            res.status(500).json({ message: "Error fetching users", error: error.message });
        }
});

module.exports = router;
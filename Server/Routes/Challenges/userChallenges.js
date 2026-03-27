const express = require('express');
const router = express.Router();
const Challenge = require('../../Models/RegisteredUsers/challengesModel'); 
const { default: mongoose } = require('mongoose');

router.get('/:userId', async (req, res) => {
try {
        const { userId } = req.params;
        
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const challenges = await Challenge.find({ 
            joinedUsers: { $in: [userObjectId] } 
        });

        console.log(`Searching for challenges joined by: ${userId}`);
        console.log(`Found ${challenges.length} challenges.`);

        res.status(200).json(challenges);
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Challenge = require("../../Models/RegisteredUsers/challengesModel"); 

router.post("/join", async (req, res) => {
  try {
    const { challengeId, userId } = req.body;

    const challenge = await Challenge.findById(challengeId);
    
    if (!challenge) {
      return res.status(404).json({ message: "Mission not found in database" });
    }

    if (challenge.joinedUsers && challenge.joinedUsers.includes(userId)) {
      return res.status(400).json({ message: "You have already deployed to this mission!" });
    }

    challenge.joinedUsers.push(userId);
    challenge.usersJoined = (challenge.usersJoined || 0) + 1;

    await challenge.save();

    res.status(200).json({ 
      message: "Deployment Successful",
      newCount: challenge.usersJoined,
      status: "success"
    });

  } catch (error) {
    console.error("Join Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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
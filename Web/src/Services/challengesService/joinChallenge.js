export const joinChallengeService = async (challengeId, userId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/challenges/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ challengeId, userId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Server Error");
    }

    return data; 
  } catch (error) {
    console.error("Service Error:", error);
    throw error;
  }
};
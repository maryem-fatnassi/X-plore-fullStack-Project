export const fetchAllChallenges = (setChallengesData)=>{
    fetch(`${process.env.REACT_APP_API_URL}/getChallenges/challenge`)
      .then((res) => res.json())
      .then((data) => setChallengesData(data))
      .catch((error) => console.error(error))
      
    
  }
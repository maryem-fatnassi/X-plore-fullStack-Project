export const fetchChallenges = (setChallengesData)=>{
    fetch(`${process.env.REACT_APP_API_URL}/getChallenges/challenge`)
      .then((res) => res.json())
      .then((data) => setChallengesData(data.slice(0,4)))
      .catch((error) => console.error(error))
      
    
  }
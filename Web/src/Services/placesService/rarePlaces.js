// fetch 4 data
export const fetchPlaces = (setPlaceData)=>{
    fetch(`${process.env.REACT_APP_API_URL}/fetchPlaces/place`)
      .then((res) => res.json())
      .then((data) => setPlaceData(data.slice(0,4)))
      .catch((error) => console.error(error))
  }

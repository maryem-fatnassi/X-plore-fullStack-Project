export const fetchPosts = async (setPosts)=>{
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/all`);
      const data = await response.json();
      setPosts(data.slice(0,3));
    } catch (error) {
        console.log(error)
    }
}
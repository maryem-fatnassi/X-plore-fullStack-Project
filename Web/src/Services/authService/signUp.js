export async function signUp(form){
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signUp`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(form)
        });

const data = await res.json()
return data
    } catch (error) {
        console.log(error)
    }
}
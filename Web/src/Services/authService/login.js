export async function login(form){
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(form)
        });
        if(!res.ok){
            await res.json()
            throw new Error('something went wrong')
        }

// const data = await res.json()
return res.json()
}
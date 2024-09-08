import React, {createContext, useEffect, useState} from 'react'


export let UserContext = createContext(0)

export default function UserContextProvider(props) {
    // values to be Provided by the Usercontext 
    const [UserToken, setUserToken] = useState(null);
    
    useEffect(()=>{
        if(localStorage.getItem("userToken")){
            setUserToken(localStorage.getItem("userToken"))
        }
    },[])
    return <UserContext.Provider value={{UserToken,setUserToken}}>
        {props.children}
    </UserContext.Provider>
}

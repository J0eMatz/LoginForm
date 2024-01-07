import clsx from "clsx";
import { useEffect, useState } from "react";

export default function LoginForm () {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isFailed, setIsFailed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] =useState(false)

    useEffect(()=> {
        const token = window.localStorage.getItem("token");
        
        if (token) {
            setIsLoggedIn(true);
        }
    }, [])

    function onSubmit (event) {
      event.preventDefault( );
      setIsLoading(true);
      
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            username: userName,
            password: password,
        }),
      })
        .then((response)=> response.json())
        .then((responseJson)=>{
            setIsLoading(false);

            if(!responseJson.token) {
                setIsFailed(true);
                return;
            }
        })
    }

    return (
        <form className={clsx(
                "border border-white/50 p-5 rounded",
                "flex flex-col gap-4",
                "w-full max-w-[500px]"
                )}
            onSubmit={onSubmit}
            action="./login">

            <input 
                className={clsx("p-2 rounded bg-white/10 text-white")}
                type="text" 
                placeholder="Username" 
                onChange={(event)=> setUserName(event.target.value)}
                value={userName}
                />

            <input className={clsx("p-2 rounded bg-white/10 text-white")}
                type="password" 
                placeholder="Password" 
                onChange={(event)=> setPassword(event.target.value)}
                value={password}
                />

            <input 
                className={clsx("bg-white", "text-black w-full p-2 font-bold")}
                type="submit" value="Ingresar" 
                />

        </form>
    )
}
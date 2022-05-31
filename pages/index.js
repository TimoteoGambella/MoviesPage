import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Login(){

    const router = useRouter()
    
    useEffect(()=>{
        router.replace("/Login")
    },[router])

    return(
        <>
        </>
    )
}
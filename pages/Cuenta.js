import { useEffect } from "react";
import { ValidationStorage } from "../Functions/ValidationStorage";
import Header from "./Components/header/Header";
import { useRouter } from "next/router"

export default function Cuenta(){
    const router = useRouter()

    useEffect(()=>{
        if(!ValidationStorage()){
            router.replace("/")
        }else{

        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
            <Header active={"Cuenta"}/>
            <p className="site-title">CUENTA</p>
        </>
    )
}
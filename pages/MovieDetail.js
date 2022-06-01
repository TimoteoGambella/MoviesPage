import { useEffect, useState } from "react";
import { ValidationStorage } from "../Functions/ValidationStorage";
import Header from "./Components/header/Header";
import MoviesDetail from "./Components/moviesdetail/MoviesDetail";
import { useRouter } from "next/router"

export default function MovieDetail(){
    const router = useRouter()

    const [id,setID]=useState("")

    useEffect(()=>{
        if(!ValidationStorage()){
            router.replace("/")
        }
        let query= new URLSearchParams(window.location.search)
        setID(query.get("id"))
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
            <Header/>
            {id!=="" && <MoviesDetail id={id}/>}
        </>
    )
}
import { useEffect, useState } from "react";
import Header from "./Components/header/Header";
import MoviesDetail from "./Components/moviesdetail/MoviesDetail";

export default function MovieDetail(){

    const [id,setID]=useState("")

    useEffect(()=>{
        let query= new URLSearchParams(window.location.search)
        setID(query.get("id"))
    },[])

    return(
        <>
            <Header/>
            {id!=="" && <MoviesDetail id={id}/>}
        </>
    )
}
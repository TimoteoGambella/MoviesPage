import Header from "./Components/header/Header";
import { useContext, useEffect, useState } from "react";
import CardMovies from "./Components/movies/CardMovies";
import Loader from "./Components/Loader";
import MoviesDetail from "./Components/moviesdetail/MoviesDetail";
import { MoviesContext } from "../Context/MoviesContext";
import { ValidationStorage } from "../Functions/ValidationStorage";
import { useRouter } from "next/router"

export default function Favs(){

    const router = useRouter()

    const {favMovies,favMoviesDB}=useContext(MoviesContext)

    const [movieDetail,setMovieDetail]=useState(false)
    const [busquedaTerminada,setBusquedaTerminada]=useState(false)

    useEffect(()=>{
        if(!ValidationStorage()){
            router.replace("/")
        }else if(favMovies.length===0){
            const token = localStorage.getItem("tokenMovies")
            favMoviesDB(token)
            setBusquedaTerminada(true)
        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        setBusquedaTerminada(true)
    },[favMovies])// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div>
            <Header active={"Favs"}/>
            <p className="site-title">FAVORITOS</p>

            {favMovies.length===0 && busquedaTerminada===false && <Loader classParam={"loader2"}/>}
            {favMovies.length===0 && busquedaTerminada===true && <p style={{textAlign:"center",marginTop:"10vw",color:"gold",fontSize:"3vw"}}>NO HAY FAVORITOS</p>}
            <div style={{backgroundColor:"black"}}>
                {favMovies.length!==0 &&
                    <>
                        {!movieDetail?
                            <div className="movies-container">
                                {favMovies.map(movie=>{
                                    return(
                                        <div key={movie.id}>
                                            <CardMovies movie={movie} setMovieDetail={setMovieDetail} site={"Favs"}/>
                                        </div>
                                    )
                                })}
                            </div>
                        :
                            <></>
                        }
                    </>

                }
            </div>
        </div>
    )
}
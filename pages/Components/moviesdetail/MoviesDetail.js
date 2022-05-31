import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MoviesContext } from "../../../Context/MoviesContext";
import Image from "next/image";
import Button from "../buttons/button";
import Estrellas from "./Estrellas";
import { useRouter } from "next/router"

export default function MoviesDetail({id}){

    const router = useRouter()

    const {movies,arrayMoviesBus,trailer}=useContext(MoviesContext)

    const [movieD,setMovieD]=useState([])

    useEffect(() => {
        movieData()
    }, [movies]);// eslint-disable-line react-hooks/exhaustive-deps
    
    const movieData=async()=>{
        if(arrayMoviesBus.length===0){
            const movie = await movies.filter(mov=>mov.id==id)
            setMovieD(movie)
        }else{
            const movie = await arrayMoviesBus.filter(mov=>mov.id==id)
            setMovieD(movie)
        }
    }

    return(
        <div className="detail-container">
            <div style={{width:"fit-content",margin:"auto"}} onClick={()=>{router.replace("/Home")}}>
                <Button info={"ATRAS"}/>
            </div>
            {movieD.length!==0 && 
                <div className="info-movie">
                    {movieD[0].poster_path === "" && <p>NO HAY POSTER</p>}
                    {movieD[0].poster_path !== "" && 
                        <div>
                            <Image src={`https://image.tmdb.org/t/p/w500/${movieD[0].poster_path}`} width={238} height={382} alt={movieD[0].title}/>
                        </div>
                    }
                    <div>
                        <h1>{movieD[0].title}</h1>
                        {movieD[0].overview === "" && <p>NO HAY REVIEW</p>}
                        {movieD[0].overview !== "" && 
                            <p>{movieD[0].overview}</p>
                        }

                        {movieD[0].vote_average==="" && <p>NO HAY VOTOS</p>}
                        {movieD[0].vote_average!=="" && 
                            <Estrellas rate={movieD[0].vote_average}/>
                        }
                    </div>
                </div>
            }
            {trailer==="BusquedaFallida" && <p style={{textAlign:"center",color:"gold",fontSize:"3vw"}}>SIN TRAILER</p>}
            {trailer!=="" && trailer!=="BusquedaFallida" &&
                <div className="trailer-container">
                    <p style={{textAlign:"center",color:"gold",fontSize:"3vw",marginTop:"-4vw"}}>TRAILER</p>
                    <iframe className="trailer" width="560" height="315" src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0`} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            }
        </div>
    )
}
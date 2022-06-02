import { useContext, useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { useRouter } from "next/router"
import { MoviesContext } from "../../../Context/MoviesContext"
import { addFavMovies,removeFavMovies } from "../../../firebase/Firebase"
import Button from "../buttons/button"
import MovieDetail from "../moviesdetail/MoviesDetail"

export default function CardMovies({movie,setMovieDetail,site}){

    const router = useRouter()

    const {favMovies,setFavMovies,trailerMovie}=useContext(MoviesContext)

    const [favButton,setFavButton]=useState(false)
    const [vistoButton,setVistoButton]=useState(false)
    
    useEffect(()=>{
        const movieFav = favMovies.filter(mov=>mov.title===movie.title)
        if(movieFav.length!==0){
            setFavButton(true)
        }
    },[favMovies])// eslint-disable-line react-hooks/exhaustive-deps

    const addFavMoviesButton=()=>{
        setFavMovies(favMovies=>[...favMovies,movie])
        addFavMovies(localStorage.getItem("tokenMovies"),[...favMovies,movie])
    }
    const removeFavMoviesButton= ()=>{
        const remMovie=favMovies.filter(mov=>mov.title!==movie.title)
        setFavMovies(remMovie)
        removeFavMovies(localStorage.getItem("tokenMovies"),remMovie)
    }
    

    // const addVistoMoviesButton=()=>{
    //     setFavMovies(favMovies=>[...favMovies,movie])
    //     addFavMovies(localStorage.getItem("tokenMovies"),[...favMovies,movie])
    // }


    const detailsButton=async()=>{
        await trailerMovie(movie.id)
        await setMovieDetail(true)
        router.replace(`/MovieDetail?id=${movie.id}&site=${site}`)
    }

    return(
        <div className="container-card">
            {movie!==undefined && 
                <Card>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="NOT FOUND"/>
                    <Card.Body className={vistoButton?"visto":""}>
                        
                        {vistoButton?
                            <button className="visto-btn" onClick={()=>{setVistoButton(!vistoButton)}}>Visto</button>
                        :
                            <button className="visto-btn visto-btn-2" onClick={()=>{setVistoButton(!vistoButton)}}>Visto</button>
                        }

                        <button className="favourite-btn" onClick={()=>{addFavMoviesButton(),setFavButton(!favButton)}}
                        style={{display:!favButton?"block":"none"}}>🤍</button>

                        <button className="favourite-btn favourite-btn-red" onClick={()=>{removeFavMoviesButton(),setFavButton(!favButton)}}
                        style={{display:favButton?"block":"none"}}>❤️</button>

                        <Card.Title className={vistoButton?"title-visto":""}>{movie.title}</Card.Title>

                        <div style={{width:"fit-content",margin:"auto",backgroundColor:"transparent"}} onClick={()=>detailsButton()}>
                            <Button info={"Detalles"}/>
                        </div>
                    </Card.Body>
                </Card>
            }
        </div>
    )
}
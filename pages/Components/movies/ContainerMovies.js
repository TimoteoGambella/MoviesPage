import { useContext, useState } from "react"
import { MoviesContext } from "../../../Context/MoviesContext"
import Loader from "../Loader"
import MoviesDetail from "../moviesdetail/MoviesDetail"
import CardMovies from "./CardMovies"
import NavegadorPages from "./NavegadorPages"

export default function ContainerMovies(){

    const {movies,arrayMoviesBus}=useContext(MoviesContext)

    const [movieDetail,setMovieDetail]=useState(false)

    return(
        <div style={{backgroundColor:"black"}}>

            {movies.length===0 && <Loader/>}
            {movies.length!==0 && arrayMoviesBus.length===0 &&
                <>
                    {!movieDetail?
                        <div className="movies-container">
                            {movies.map(movie=>{
                                return(
                                    <div key={movie.id}>
                                        <CardMovies movie={movie} setMovieDetail={setMovieDetail} />
                                    </div>
                                )
                            })}
                        </div>
                    :
                        <MoviesDetail setMovieDetail={setMovieDetail}/>
                    }
                </>

            }
            {arrayMoviesBus.length!==0 && arrayMoviesBus!=="BusquedaFallida" &&
                    <>
                        {!movieDetail?
                            <div className="movies-container">
                                {arrayMoviesBus.map(movie=>{
                                    return(
                                        <div key={movie.id}>
                                            <CardMovies movie={movie} setMovieDetail={setMovieDetail} />
                                        </div>
                                    )
                                })}
                            </div>
                        :
                            <MoviesDetail setMovieDetail={setMovieDetail}/>
                        }
                    </>
            }
            {arrayMoviesBus==="BusquedaFallida"&&
                <div className="movies-container">
                    <p style={{color:"gold",fontSize:"2vw"}}>No se encontraron resultados</p>
                </div>
            }
            
            {!movieDetail && <NavegadorPages/>}
        </div>
    )
}
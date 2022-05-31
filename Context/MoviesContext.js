import { useEffect,useState, createContext } from "react";
import axios from "axios";
import swAlert from "sweetalert";
import { getFavMovies } from "../firebase/Firebase";

export const MoviesContext = createContext();

export function Movies ({children}){

    const [movies,setMovies]=useState([])
    const [favMovies,setFavMovies]=useState([])
    const[arrayMoviesBus,setArrayMoviesBus]=useState([])

    const [page,setPage]=useState(1)

    const [trailer,setTrailer]=useState("")

    const [stateBuscador,setStateBuscador]=useState(false)
    const [valueBuscador,setValueBuscador]=useState("")

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=ffe8f0441019f353fa52077fa24c7f36&language=es-ES&page=${page}&include_adult=false`
        axios.get(endPoint)
        .then(res=>{
            const apiData = res.data
            setMovies(apiData.results)
        })
        .catch(error=>{
                swAlert("Hubo errores. Intenta mas tarde","","error")
            })
    }, [page])// eslint-disable-line react-hooks/exhaustive-deps
    
    const moviesBus =(bus,busState)=>{
        if(bus.length>2){
            const endPoint= `https://api.themoviedb.org/3/search/movie?api_key=ffe8f0441019f353fa52077fa24c7f36&language=es-ES&query=${bus}&include_adult=false`
            
            axios.get(endPoint)
            .then(res=>{
                const apiData=res.data
                if(apiData.results.length===0){
                    setArrayMoviesBus("BusquedaFallida")
                }else{
                    setArrayMoviesBus(apiData.results)
                }
                setValueBuscador(bus)
            })
            .catch(error=>{
                swAlert("Hubo errores. Intenta mas tarde","","error")
            })
        }else if(bus.length<=2 && busState===true){
            if(arrayMoviesBus.length!==0){
                setArrayMoviesBus([])
                setValueBuscador(bus)
            }
        }
    }

    const clearArrayMoviesBus = ()=>{
        setArrayMoviesBus([])
        setStateBuscador(true)
        setValueBuscador("")
    }

    const favMoviesDB= async(idUser)=>{
        await getFavMovies(idUser).then(res=>{
            setFavMovies(res[0].favsMovies)
        })
    }


    const trailerMovie = (idMovie)=>{

        const endPoint = `https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=ffe8f0441019f353fa52077fa24c7f36&language=es-ES`
        axios.get(endPoint)
        .then(res=>{
            setTrailer(res.data.results[0].key)
            return
        })
        .catch(error=>{
            setTrailer("BusquedaFallida")
            return
        })
    }

    return(
        <MoviesContext.Provider value={{movies,setPage,page,moviesBus,arrayMoviesBus,favMovies,setFavMovies,favMoviesDB,trailerMovie,trailer,clearArrayMoviesBus,stateBuscador,valueBuscador}}>
            {children}
        </MoviesContext.Provider>
    )
}
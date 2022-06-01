import { useEffect,useState, createContext } from "react";
import swAlert from "sweetalert";
import axios from "axios";

export const GenresContext = createContext();

export function Genres ({children}){

    const [genres,setGenres]=useState([])

    useEffect(() => {
        
        const endPoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=ffe8f0441019f353fa52077fa24c7f36&language=es-ES`
        axios.get(endPoint)
        .then(res=>{
            const apiData = res.data
            setGenres(apiData.genres)
        })
        .catch(error=>{
                swAlert("Hubo errores. Intenta mas tarde","","error")
            })
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    

    return(
        <GenresContext.Provider value={{genres}}>
            {children}
        </GenresContext.Provider>
    )
}
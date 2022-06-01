import { useEffect,useContext } from "react";
import { useRouter } from "next/router"
import Header from "./Components/header/Header";
import { ValidationStorage } from "../Functions/ValidationStorage";
import ContainerMovies from "./Components/movies/ContainerMovies";
import { MoviesContext } from "../Context/MoviesContext";

export default function Home() {

  const router = useRouter()

  const {favMoviesDB}=useContext(MoviesContext)

  useEffect(()=>{
    if(!ValidationStorage()){
        router.replace("/")
    }else{
      const token = localStorage.getItem("tokenMovies")
      favMoviesDB(token).then(res=>{
      })
    }
  },[])// eslint-disable-line react-hooks/exhaustive-deps

  

  return (
    <div>
      <Header active={"Home"}/>
      <p className="site-title">INICIO</p>
      <ContainerMovies/>
    </div>
  )
}

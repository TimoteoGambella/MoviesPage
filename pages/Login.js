import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router"
import Logearse from "./Components/login/Logearse";
import Registrarse from "./Components/login/Registrarse";
import { ValidationStorage } from "../Functions/ValidationStorage";
import { MoviesContext } from "../Context/MoviesContext";

export default function Login(){

    const router = useRouter()

    const {favMoviesDB}=useContext(MoviesContext)

    const [form,setForm]=useState(true)

    useEffect(()=>{
        if(ValidationStorage()){
            router.replace("/Home")
        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    const saveData = (array)=>{
        const date = {"hora": ((new Date().getHours())),'dia': (new Date()).getDate(),'mes':((new Date()).getMonth()+1),"ano":(new Date()).getFullYear()};
        localStorage.setItem("tokenMovies",array[0].id)
        localStorage.setItem("tokenMoviesDate",JSON.stringify(date))

        router.replace("/Home")
    }
    
    return(
        <div>
            <div className="login-container">
                {form && <Logearse form={form} setForm={setForm} saveData={saveData}/>}
                {!form && <Registrarse form={form} setForm={setForm} saveData={saveData}/>}
            </div>
        </div>
    )
}
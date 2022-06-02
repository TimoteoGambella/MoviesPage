import { useContext, useEffect, useState } from "react"
import { MoviesContext } from "../../Context/MoviesContext"

export default function Buscador(){

    const {setPage,moviesBus,valueBuscador}=useContext(MoviesContext)

    const [dataBus,setDataBus]=useState("")
    const [busState,setBusState]=useState(false)
    const [pathname,setPathname]=useState(true)

    const changeBuscador=()=>{
        setPage(1)
        setBusState(true)
        setDataBus(document.getElementById("buscador").value)
    }

    useEffect(()=>{
        let query= window.location.pathname
        if(query==="/Home"){
            setPathname(false)
        }
        document.getElementById("buscador").value=valueBuscador
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(()=>{
        moviesBus(dataBus,busState)
    },[dataBus])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(valueBuscador===""){
            document.getElementById("buscador").value=""
        }
    },[valueBuscador])// eslint-disable-line react-hooks/exhaustive-deps
    
    return(
        <div className="buscador-container">
            <input disabled={pathname}  placeholder="Buscar..." name="buscador" id="buscador" type={"text"} autoComplete="off" className="buscador"
                onChangeCapture={changeBuscador}
            />
        </div>
    )
}
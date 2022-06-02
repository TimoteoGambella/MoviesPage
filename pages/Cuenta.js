import { useEffect } from "react";
import { ValidationStorage } from "../Functions/ValidationStorage";
import Header from "./Components/header/Header";
import { useRouter } from "next/router"
import { ConectorPlugin } from "../Functions/ConectorPlugin";

export default function Cuenta(){
    const router = useRouter()

    const RUTA_API = "http://localhost:8000";

    useEffect(()=>{
        if(!ValidationStorage()){
            router.replace("/")
        }else{

        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    const tick =()=>{

    let conector = new ConectorPlugin();
    conector.establecerTamanioFuente(1, 1);
    conector.establecerEnfatizado(0);
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
    conector.texto("Parzibyte's blog\n");
    conector.imprimirEn("OneNote (Desktop)")
        .then(respuestaAlImprimir => {
            if (respuestaAlImprimir === true) {
                console.log("OK")
            } else {
                console.log("NO OK")
            }
        });
    }

    return(
        <>
            <Header active={"Cuenta"}/>
            <p className="site-title">CUENTA</p>
            <button onClick={()=>tick()} style={{backgroundColor:"red"}}>IMPRIMIR</button>
        </>
    )
}
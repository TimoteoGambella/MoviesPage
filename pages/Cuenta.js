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
        ConectorPlugin.obtenerImpresoras()
            .then(impresoras => {                    
            console.log(impresoras)
        });

    let conector = new ConectorPlugin();
    conector.establecerTamanioFuente(1, 1);
    conector.establecerEnfatizado(0);
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
    conector.texto("FELIZ CUMPLEAÑOS CARUGA 🤍\n");
    conector.texto("Timo y Fede")
    conector.imprimirEn("EPSON TM-T20II Receipt")
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
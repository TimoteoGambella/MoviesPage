import Header from "./Components/header/Header";
import { ConectorPlugin } from "../Functions/ConectorPlugin";

export default function Cuenta(){

    const ticket =()=>{

        const imprimir = new ConectorPlugin()
            imprimir.texto("HOLA MUNDO")
            imprimir.imprimirEn("EPSON")
            .then(respuestaAlImprimir => {
                if (respuestaAlImprimir === true) {
                    console.log("OK")
                    console.log(respuestaAlImprimir)
                } else {
                    console.log("NOOK")
                }
            });
    }

    return(
        <>
            <Header/>
            <button onClick={()=>ticket()} style={{width:"10vw",height:"10vw",background:"red"}}>BOTON TICKET</button>
        </>
    )
}
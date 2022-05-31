import Header from "./Components/header/Header";
import { ConectorPlugin } from "../ConectorPlugin";


export default function Cuenta(){
    const ticket =()=>{
        const conector = new ConectorPlugin()
            conector.texto("HOLA MUNDO")
            conector.imprimirEn("EPSON")
            .then(respuestaAlImprimir => {
                console.log(respuestaAlImprimir)
                if (respuestaAlImprimir === true) {
                    console.log("OK")
                } else {
                    console.log("No OK")
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
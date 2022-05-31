import Header from "./Components/header/Header";
import { ConectorPlugin } from "./ConectorPlugin";


export default function Cuenta(){
    const loguear = texto => (new Date()).toLocaleString() + " " + texto + "\n";

    const ticket =()=>{

        const imprimir = new ConectorPlugin()
            imprimir.texto("HOLA MUNDO")
            imprimir.imprimirEn("")
            .then(respuestaAlImprimir => {
                if (respuestaAlImprimir === true) {
                    loguear("Impreso correctamente");
                    console.log("OK")
                } else {
                    loguear("Error. La respuesta es: " + respuestaAlImprimir);
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
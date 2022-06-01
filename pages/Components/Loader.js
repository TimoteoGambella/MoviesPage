import React from "react"

export default function Loader({classParam}){
    return(
        <div id="contenedor">
            <div className={classParam} id="loader">Loading...</div>
        </div>
    )
}

import { useContext, useState } from "react"
import { MoviesContext } from "../../../Context/MoviesContext"
import { useRouter } from "next/router"

export default function NavegadorPages(){

    const router = useRouter()

    const {setPage}=useContext(MoviesContext)

    const [pageNum,setPageNum]=useState(1)

    const handleAnterior = ()=>{
        if(pageNum===1){
            return
        }else{
            setPageNum(pageNum-1)
            setPage(pageNum-1)
            router.replace(`/Home?page=${pageNum}`)
        }
    }
    const handleSiguiente = ()=>{
        setPageNum(pageNum+1)
        setPage(pageNum+1)
        router.replace(`/Home?page=${pageNum}`)
    }

    return(
        <div className="navegador-pages">
            <a href="#header" style={{color:"gold",textDecoration:"none"}}>
                <p onClick={()=>handleAnterior()}>
                    Anterior ...
                </p>
            </a>
            <p>
                {pageNum}
            </p>
            <a href="#header" style={{color:"gold",textDecoration:"none",height:"auto"}}>
                <p onClick={()=>handleSiguiente()}>
                    ... Siguiente
                </p>
            </a>
        </div>
    )
}
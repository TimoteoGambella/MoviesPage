import Link from 'next/link'
import { Nav, Navbar } from 'react-bootstrap'
import { useRouter } from "next/router"
import { MoviesContext } from "../../../Context/MoviesContext"
import { useContext } from 'react'

export default function Nav_Bar({active}){

    const router = useRouter()

    const {setPage,clearArrayMoviesBus}=useContext(MoviesContext)

    const handleHome=(site)=>{
        clearArrayMoviesBus()
        setPage(1)
        router.replace(site)
    }

    return(
        <div className="navbar-container">
            {active==="Home"&&
                <>
                    <p className="nav-link active" onClick={()=>handleHome("/Home")}>Inicio</p>
                    <p href={'/Favs'} className="nav-link" onClick={()=>handleHome("/Favs")}>Favoritos</p>
                    <p href={'/Cuenta'} className="nav-link" onClick={()=>handleHome("/Cuenta")}>Cuenta</p>
                </>
            }
            {active==="Favs"&&
                <>
                    <p className="nav-link" onClick={()=>handleHome("/Home")}>Inicio</p>
                    <p href={'/Favs'} className="nav-link active" onClick={()=>handleHome("/Favs")}>Favoritos</p>
                    <p href={'/Cuenta'} className="nav-link" onClick={()=>handleHome("/Cuenta")}>Cuenta</p>
                </>
            }
            {active==="Cuenta"&&
                <>
                    <p className="nav-link" onClick={()=>handleHome("/Home")}>Inicio</p>
                    <p href={'/Favs'} className="nav-link" onClick={()=>handleHome("/Favs")}>Favoritos</p>
                    <p href={'/Cuenta'} className="nav-link active" onClick={()=>handleHome("/Cuenta")}>Cuenta</p>
                </>
            }
            {active===undefined&&
                <>
                    <p className="nav-link" onClick={()=>handleHome("/Home")}>Inicio</p>
                    <p href={'/Favs'} className="nav-link" onClick={()=>handleHome("/Favs")}>Favoritos</p>
                    <p href={'/Cuenta'} className="nav-link" onClick={()=>handleHome("/Cuenta")}>Cuenta</p>
                </>
            }
        </div>
    )
}
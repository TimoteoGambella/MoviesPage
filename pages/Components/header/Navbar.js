import Link from 'next/link'
import { Nav, Navbar } from 'react-bootstrap'
import { useRouter } from "next/router"
import { MoviesContext } from "../../../Context/MoviesContext"
import { useContext } from 'react'

export default function Nav_Bar(){

    const router = useRouter()

    const {setPage,clearArrayMoviesBus}=useContext(MoviesContext)

    const handleHome=()=>{
        clearArrayMoviesBus()
        setPage(1)
        router.replace("/Home")
    }

    return(
        <div className="navbar-container">
            <Navbar expand="sl" className="navbar-expand-custom navBarPrincipal">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbar-nav">
                        <p className="nav-link" onClick={()=>handleHome()}>Inicio</p>
                        <Link href={'/Favs'} className="nav-link">Favoritos</Link>
                        <Link href={'/Cuenta'} className="nav-link">Cuenta</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
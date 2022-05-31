import Link from 'next/link'
import { Nav, Navbar } from 'react-bootstrap'
import Buscador from '../Buscador'
import Nav_Bar from './Navbar'

export default function Header(){
    return(
        <div style={{display:"flex"}} id="header">
            <Nav_Bar/>
            <Buscador/>
        </div>
    )
}
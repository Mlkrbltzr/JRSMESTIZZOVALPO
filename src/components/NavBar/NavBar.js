import "./NavBar.css"
import CartWidget from "../CartWidget/CartWidget"
import {NavLink, Link} from "react-router-dom"


const NavBar = () => {
    return (
        <nav className="NavBar">
            <Link to='/'>
            <h3>Mestizzo</h3>
            </Link>
            
            <div className="Categories" >
                <NavLink to={'/category/Tempuras'} className={({isActive}) => isActive ? 'ActiveOption' : 'Option' } >Tempuras</NavLink>
                <NavLink to={'/category/Algas'} className={({isActive}) => isActive ? 'ActiveOption' : 'Option' } >Algas</NavLink>
                <NavLink to={'/category/Gohan'} className={({isActive}) => isActive ? 'ActiveOption' : 'Option' } >Gohan</NavLink>
            </div>
            <CartWidget/>
        </nav>
    )
} 

export default NavBar


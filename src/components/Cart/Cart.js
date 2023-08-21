import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import CartItem from "../CartItem/CartItem"


const Cart = () => {
    const { cart, clearCart, totalQuantity} = useContext(CartContext)

    let total = 0;
        cart.forEach((p) => {
            total += p.price * p.quantity;
    });


    if(totalQuantity === 0){
        return (
            <div>
                <h1>No hay items en el carro</h1>
                <Link to='/' className="Option">Productos</Link>
            </div>
        )
    }

    return (
        <div>
            { cart.map(p => <CartItem key={p.id} {...p}/>) }
            <h3>Total: ${total}</h3>
            <Button variant="secondary" onClick={() => clearCart()}>Limpiar Carrito</Button>
            <Button variant="danger"><Link to='/' className="Option">Seguir Comprando</Link></Button>
            <Button variant="dark"><Link to='/checkout' className="Option">Checkout</Link></Button>
        </div>
    )
}

export default Cart


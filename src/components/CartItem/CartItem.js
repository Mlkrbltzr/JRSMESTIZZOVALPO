

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartItem = ({id, name, img, price, quantity}) => {

    const { removeItem } = useContext(CartContext)
    return (
        <Card 
        bg={'Danger'.toLowerCase()}
        key={'Danger'}
        text={'Danger'.toLowerCase() === 'light' ? 'dark' : 'white'}
        className='cardItem'>
            <header className='header'>
                <h2 className='title'>
                   {name} 
                </h2>
            </header>
            <section>
                <p className='info'>
                    Cantidad {quantity}
                </p>
                <p className='info'>
                    Precio Unidad: ${price}
                </p>
                <p className='info'>
                    Subtotal: ${price * quantity}
                </p>
            </section>
            <footer className='itemFooter'>
                <Button variant="secondary" onClick={() => removeItem(id)}>
                    <Link to={`/cart`} className='Option'>Eliminar</Link>
                </Button>
            </footer>
        </Card>
    )
}

export default CartItem


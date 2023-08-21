import { useState, useContext } from "react";
import CartContext from "../../context/CartContext";
import { collection, documentId, getDocs, query, where } from "firebase/firestore";
import { writeBatch, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig"; 
import CheckoutForm from '../CheckoutForm/CheckoutForm';




const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');

    const { cart, total, clearCart } = useContext(CartContext);

    const createOrder = async ({ name, phone, email }) => {
        setLoading(true);

        try {
            const objOrder = {
                buyer: {
                    name, phone, email
                },
                items: cart,
                total: total,
                date: Timestamp.fromDate(new Date())
            };

            const batch = writeBatch(db);

            const outOfStock = [];

            const ids = cart.map(prod => prod.id);

            const productsRef = collection(db, 'products');

            const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)));

            const { docs } = productsAddedFromFirestore;

            docs.forEach(doc => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock;

                const productAddedToCart = cart.find(prod => prod.id === doc.id);
                const prodQuantity = productAddedToCart?.quantity;

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc });
                }
            });

            if (outOfStock.length === 0) {
                await batch.commit();

                const orderRef = collection(db, 'orders');

                const orderAdded = await addDoc(orderRef, objOrder);

                setOrderId(orderAdded.id);
                clearCart();
            } else {
                console.error('Hay productos que están fuera de stock');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h1>Se está cargando su orden...</h1>;
    }

    if (orderId) {
        return <h1>El código de su compra es: {orderId}</h1>;
    }

    return(
        <div>
            <h1>Checkout</h1>
            <CheckoutForm onConfirm={createOrder}/>
        </div>
    )
};

export default Checkout;


/*import { getDocs, addDoc, collection, query, where, Timestamp, writeBatch, documentId } from "firebase/firestore"
import { db } from "../../services/firebase/firebaseConfig"

import CheckoutForm from '../CheckoutForm/CheckoutForm'
import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState('')

    const { cart, totalQuantity, clearCart} = useContext(CartContext)

    const createOrder = async ({ name, phone, email }) => {
        setLoading(true)

        try{
            const objOrder = {
                buyer: {
                    name, phone, email
                },
                items: cart,
                total: totalQuantity(),
                date: Timestamp.fromDate(new Date())
            }
            const batch = writeBatch(db)
            
            const outOfStock = []

            const ids = cart.map(prod => prod.id)

            const productsRef = collection(db, 'productos')

            const productosAgregadosdeFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)))

            const { docs } = productosAgregadosdeFirestore

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock

                const productosAgregadosalCarro = cart.find(prod => prod.id === doc.id )
                const prodCantidad = productosAgregadosalCarro?.quantity

                if(stockDb >= prodCantidad){
                    batch.update(doc.ref, { stock: stockDb - prodCantidad})
                }else{
                    outOfStock.push({ id: doc.id, ...dataDoc})
                }
            })

            if(outOfStock.length === 0){
                await batch.commit()

                const orderRef = collection(db, 'orders')

                const orderAdded = await addDoc(orderRef, objOrder)

                setOrderId(orderAdded.id)
                clearCart()
            }else{
                console.error('hay productos que estan fuera de stock')
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }; 

    if(loading){
        return <h1>Cargando su orden de compra...</h1>
    }

    if(orderId){
        return <h1>Gracias por su compra! el id es: {orderId}</h1>
    }

    return(
        <div>
            <h1 className="text-dark">Checkout</h1>
            <CheckoutForm onConfirm={createOrder}/>
        </div>
    )

}

export default Checkout*/



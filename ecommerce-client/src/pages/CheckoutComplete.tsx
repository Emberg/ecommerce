import { Link } from "react-router"
import { useOrder } from "../hooks/useOrder";
import { useEffect } from "react";
import { Order } from "../types/Order";
import { IOrder } from "../models/IOrder";

export const CheckoutComplete = () => {
    const {isLoading, fetchOrderByPaymentIdHandler, updateOrderHandler} = useOrder();

    useEffect(() => {
        async function editOrder() {
            const url = window.location;
            const params = new URLSearchParams(url.search);
            const session = params.get('session_id')!;

            const order = await fetchOrderByPaymentIdHandler(session);
            await updateOrderHandler(""+order.id, {...order, payment_status: "Paid", order_status:"Received"})

            localStorage.clear()
        }
        
        editOrder();
    }, [])

    if (isLoading) return <p>Loading...</p>

    return (
        <>
            <h3>Checkout Completed!</h3>
            <br></br>

            <Link to="/" className='back-link'>&#x2190; Return to store</Link>
        </>
    )
}
import { Link } from "react-router";
import { useCart } from "../hooks/useCart";

export const Cart = () => {

    const {context, handleChangeQuantity, handleRemoveFromCart, handleResetCart, getCartTotal} = useCart();
    const cart = context.cart


    return (
        <div style={{display:"flex", flexDirection:"column", marginLeft:"50px", width:"370px", backgroundColor:"white", paddingLeft:"20px"}}>
            <h2>Cart</h2>
            {cart.map((item) => (<>
                <h3 style={{width:"500px"}}>{item.quantity} {item.product.name} {item.quantity*item.product.price} SEK
                &nbsp;&nbsp;<button style={{width:"35px", height:"40px"}} onClick={() => handleChangeQuantity(item.product, 1)}>+</button>
                &nbsp;<button style={{width:"35px", height:"40px"}} onClick={() => {
                    if(item.quantity == 1){
                        handleRemoveFromCart(item);
                    } else {
                        handleChangeQuantity(item.product, -1)
                    }
                }}>-</button></h3>
            </>))}
            Total cost: {getCartTotal()} SEK
            <br></br>
            <br></br>
            <button style={{width:"260px", marginRight:"20px"}} onClick={() => handleResetCart()}>Clear Cart</button>
            <Link to={`/checkout/`}><button style={{width:"260px"}}>Go to Checkout</button></Link>
        </div>
    )
}
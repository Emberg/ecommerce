import { FormEvent, useState } from "react";
import { useCart } from "../hooks/useCart";
import { useOrder } from "../hooks/useOrder";
import { Customer } from "../types/Customer";
import { useCustomer } from "../hooks/useCustomer";
import { Order } from "../types/Order";

export const Checkout = () => {
    const {fetchCustomerByMailHandler, createCustomerHandler} = useCustomer();
    const {context, handleChangeQuantity, handleRemoveFromCart, getCartTotal} = useCart();
    const {createOrderHandler} = useOrder();
    const cart = context.cart
    const [error, setError] = useState<boolean>(false);
    const [awaitingLogin, setAwaitingLogin] = useState<boolean>(true);

    const [customerID, setCustomerID] = useState<number>(0)
    const [customer, setCustomer] = useState<Customer>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        street_address: "",
        postal_code: "",
        city: "",
        country: ""
    }); 

    let order = {
        customer_id: 0,
        total_price: 0,
        payment_status: "",
        payment_id: "",
        order_status: ""
    }

    const handleChange = (e: FormEvent<HTMLInputElement>, property: string) => {
        setCustomer({...customer, [property]: e.currentTarget.value});
    }

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try{
            const fetchedCustomer = await fetchCustomerByMailHandler(customer.email);
            setAwaitingLogin(false);
            setError(false);
            setCustomerID(fetchedCustomer.id)
            setCustomer({
                firstname: fetchedCustomer.firstname,
                lastname: fetchedCustomer.lastname,
                email: fetchedCustomer.email,
                password: fetchedCustomer.password,
                phone: fetchedCustomer.phone,
                street_address: fetchedCustomer.street_address,
                postal_code: fetchedCustomer.postal_code,
                city: fetchedCustomer.city,
                country: fetchedCustomer.country
            })
            localStorage.setItem('customer', JSON.stringify(customer));
            return;
        } catch(e){
            setAwaitingLogin(false);
            console.log("error fetching customer by mail, checkout");
            return;
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if(
            customer.firstname == "" ||
            customer.lastname == "" ||
            customer.email == "" ||
            customer.phone == "" ||
            customer.street_address == "" ||
            customer.postal_code == "" ||
            customer.city == "" ||
            customer.country == ""
        ) {
            setError(true);
            return;
        }
            
        setError(false);
        localStorage.setItem('customer', JSON.stringify(customer));
        if(customerID == null){
            const data = await createCustomerHandler(customer)
            setCustomerID(data.id);
        }

        order = {
            customer_id: customerID,
            total_price: getCartTotal(),
            payment_status: "Unpaid",
            payment_id: "",
            order_status: "Pending"
        }
        
        try {
          const requestData = JSON.stringify({items: localStorage.getItem("cart"), customer_id: customerID})

          const response = await fetch('http://localhost:3000/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: requestData
          });
    
          const data = await response.json();
          //console.log(data);
    
          order = {...order, payment_id: data.checkout_session_id};

          console.log(order);
          await createOrderHandler(order);

          // Redirect to Stripe Hosted Checkout
          window.location.href = data.checkout_url
        } catch(error) {
          console.log(error)
        }
      }
    

    return (<>
        {cart.length == 0 ? 
            <>Cart is empty, cant checkout</> 
            : 
            <>
                <h1>Checkout (Hosted)</h1>
                
                <h3>Varukorg</h3>
                {cart.map((item) => (<p>
                    <h4>
                        {item.quantity} {item.product.name}, {item.product.price*item.quantity} SEK 
                        &nbsp;
                        <button style={{width:"35px", height:"40px"}} onClick={() => handleChangeQuantity(item.product, 1)}>+</button>
                        &nbsp;
                        <button style={{width:"35px", height:"40px"}} 
                            onClick={() => {
                                if(item.quantity == 1){
                                    handleRemoveFromCart(item);
                                } else {
                                    handleChangeQuantity(item.product, -1)
                                }
                            }}>-</button>
                    </h4>
                </p>))}
                <p><h4>Total: {getCartTotal()} SEK</h4></p>
        
                <h3>Kund info (formulär)</h3>

                    {awaitingLogin ? 

                    <form action="" onSubmit={handleLoginSubmit}>
                        <label>Email:</label>
                        <input type="text" id="email" value={customer?.email} onChange={e=>handleChange(e, "email")}/>
                        <button>Fetch Data Passwordlessly</button>
                    </form>

                    :
                    <>
                    {error && <div style={{color:"red"}}>Please enter all required information<br></br><br></br></div>}

                    <form action="" onSubmit={handleSubmit}>
                        <label>Email:</label>
                        <input type="text" id="email" value={customer?.email} onChange={e=>handleChange(e, "email")}/>

                        <label>Firstname:</label>
                        <input type="text" id="firstname" value={customer?.firstname} onChange={e=>handleChange(e, "firstname")}/>

                        <label>Lastname:</label>
                        <input type="text" id="lastname" value={customer?.lastname} onChange={e=>handleChange(e, "lastname")}/>

                        <label>Phone:</label>
                        <input type="text" id="phone" value={customer?.phone} onChange={e=>handleChange(e, "phone")}/>

                        <label>Street adress:</label>
                        <input type="text" id="street_address" value={customer?.street_address} onChange={e=>handleChange(e, "street_address")}/>

                        <label>Postal code:</label>
                        <input type="text" id="postal_code" value={customer?.postal_code} onChange={e=>handleChange(e, "postal_code")}/>

                        <label>City:</label>
                        <input type="text" id="city" value={customer?.city} onChange={e=>handleChange(e, "city")}/>

                        <label>Country:</label>
                        <input type="text" id="country" value={customer?.country} onChange={e=>handleChange(e, "country")}/>

                        <h3>Betalning</h3>

                        <button>Till betalning</button>
                    </form>
                </>
            }
            </> 
        }  
    </>)
}
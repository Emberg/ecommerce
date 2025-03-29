import { Request, Response } from "express";
import { Product } from "../models/Product";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const directToCheckout = async (req: Request, res: Response) => { 

    //console.log(req.body.items);

    const stuff = <any>[];
    const reqItems =  JSON.parse(req.body.items);
    const clientID = JSON.parse(req.body.customer_id);

    console.log(reqItems);

    reqItems.forEach(item => {
        stuff.push({
            price_data: {
              currency: 'SEK',
              product_data: {
                name: item.product.name,
              },
              unit_amount: item.product.price * 100,
            },
            quantity: item.quantity,
          });
    });

    console.log(clientID);

    const session = await stripe.checkout.sessions.create({
        line_items: stuff,
        mode: 'payment',
        success_url: 'http://localhost:5173/checkout/complete?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:5173/checkout',
        client_reference_id: clientID
      });
    
    
      res.json({checkout_url: session.url, checkout_session_id: session.id});
    
      // res.redirect(303, session.url);
}
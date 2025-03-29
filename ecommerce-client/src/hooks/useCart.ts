import { useContext } from 'react'
import CartContext from '../contexts/CartContext';
import { CartACtionType } from '../reducers/CartReducer';
import { CartItem } from '../models/CartItem';
import { IProduct } from '../models/IProduct';

export const useCart = () => {
  const context = useContext(CartContext);
  const cart = context.cart

  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider')
  }

  const handleAddToCart = (product: IProduct, quantity: number) => {
    context.dispatch({
      type: CartACtionType.ADD_ITEM,
      payload: new CartItem(product, quantity)
    })
  }

  const handleChangeQuantity = (product: IProduct, quantity: number) => {
    context.dispatch({
      type: CartACtionType.CHANGE_QUANTITY,
      payload: new CartItem(product, quantity)
    })
  }

  const handleRemoveFromCart = (cartItem: CartItem) => {
    context.dispatch({
      type: CartACtionType.REMOVE_ITEM,
      payload: cartItem
    })
  }


  const handleResetCart = () => {
    context.dispatch({
      type: CartACtionType.RESET_CART,
      payload: null
    })
  }

  const getCartTotal = () => {
    let sum = 0;
    cart.forEach(item => {
      sum = sum + item.product.price*item.quantity
    });
    return sum;
  }

  return {
    context, 
    handleAddToCart,
    handleChangeQuantity,
    handleRemoveFromCart,
    handleResetCart,
    getCartTotal
  }
}

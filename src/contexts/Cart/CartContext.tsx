//@ts-nocheck
import { createContext } from "react";
import { ICart } from "../../interfaces/cart";

interface ICartContext {
  cartItems: [];
  clearCart: () => void;
  increase: (payload: any) => void;
  itemCount: [];
  handleCheckout: () => void;
  
  // add any other properties or methods that you expect to use
}

const CartContext = createContext<ICartContext>({
  cartItems: [],
});

export default CartContext;
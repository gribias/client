import { createContext } from "react";
import { ICart } from "../../interfaces/cart";

interface ICartContext {
  cartItems: ICart[];
  clearCart: () => void;
  increase: (payload: ICart) => void;
  itemCount: number;
  handleCheckout: () => void;
}

const CartContext = createContext<ICartContext>({
  cartItems: [],
  clearCart: () => {},
  increase: () => {},
  itemCount: 0,
  handleCheckout: () => {},
});

export default CartContext;

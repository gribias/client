//@ts-nocheck
// /src/Context/Cart/CartReducer.jsx

//Import the Action types
import {
    REMOVE_ITEM,
    ADD_TO_CART,
    INCREASE,
    DECREASE,
    CHECKOUT,
    CLEAR,
  } from "./CartTypes";

  // Save the cartItems to local storage
const Storage = (cartItems) => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.length > 0 ? cartItems : [])
    );
  };    
  
  // Export function to calculate the total price of the cart and the total quantity of the cart
  export const sumItems = (cartItems: any[]) => {
    Storage(cartItems);
    let itemCount = cartItems.reduce(
      (total, product) => total + product.quantity,
      0
    );
    console.log("itemCount: ", itemCount);
    let total = cartItems
      .reduce((total, product) => total + product.cost * product.quantity, 0)
      .toFixed(2);
    return { itemCount, total };
  };
  
  // The reducer is listening for an action, which is the type that we defined in the CartTypes.js file
  const CartReducer = (state, action) => {
    // The switch statement is checking the type of action that is being passed in
    switch (action.type) {
      // If the action type is ADD_TO_CART, we want to add the item to the cartItems array
      case ADD_TO_CART:
  const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
  if (existingItemIndex !== -1) {
    const existingItem = state.cartItems[existingItemIndex];
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + 1
    };
    const updatedCartItems = [      ...state.cartItems.slice(0, existingItemIndex),      updatedItem,      ...state.cartItems.slice(existingItemIndex + 1)    ];
    return {
      ...state,
      ...sumItems(updatedCartItems),
      cartItems: updatedCartItems
    };
  } else {
    return {
      ...state,
      ...sumItems([...state.cartItems, { ...action.payload, quantity: 1 }]),
      cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
    };
  }

  
      // If the action type is REMOVE_ITEM, we want to remove the item from the cartItems array
      case REMOVE_ITEM:
        return {
          ...state,
          ...sumItems(
            state.cartItems.filter((item) => item.id !== action.payload.id)
          ),
          cartItems: [
            ...state.cartItems.filter((item) => item.id !== action.payload.id),
          ],
        };
  
      // If the action type is INCREASE, we want to increase the quantity of the particular item in the cartItems array
      case INCREASE:
        const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
        const updatedItem = {
          ...state.cartItems[index],
          quantity: state.cartItems[index].quantity + 1
        };
        const updatedCartItems = [
          ...state.cartItems.slice(0, index),
          updatedItem,
          ...state.cartItems.slice(index + 1)
        ];
        
        return {
          ...state,
          ...sumItems(updatedCartItems),
          cartItems: updatedCartItems
        };
  
      // If the action type is DECREASE, we want to decrease the quantity of the particular item in the cartItems array
      case DECREASE:
        state.cartItems[
          state.cartItems.findIndex((item) => item.id === action.payload.id)
        ].quantity--;
        return {
          ...state,
          ...sumItems(state.cartItems),
          cartItems: [...state.cartItems],
        };
  
      // If the action type is CHECKOUT, we want to clear the cartItems array and set the checkout to true
      case CHECKOUT:
        return {
          cartItems: [],
          checkout: true,
          ...sumItems([]),
        };
  
      //If the action type is CLEAR, we want to clear the cartItems array
      case CLEAR:
        return {
          cartItems: [],
          ...sumItems([]),
        };
  
      //Return the state if the action type is not found
      default:
        return state;
    }
  };
  
  export default CartReducer;
  
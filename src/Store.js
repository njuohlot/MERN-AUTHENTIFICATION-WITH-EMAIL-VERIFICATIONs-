import { createContext, useReducer } from "react";

export const Store = createContext();
export const initialState = {
  cart: {
    basket: localStorage.getItem("basket")
      ? JSON.parse(localStorage.getItem("basket"))
      : [],
  },
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
};
//calculating cart total
export const getBasketTotal = (basket) =>
  basket.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      //add to cart
      const newItem = action.payload;
      const existItem = state.cart.basket.find(
        (item) => item._id === newItem._id
      );
      const basket = existItem
        ? state.cart.basket.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.basket, newItem];
      localStorage.setItem("basket", JSON.stringify(basket));
      return { ...state, cart: { ...state.cart, basket } };
    //remove from cart
    case "CART_REMOVE_ITEM": {
      const basket = state.cart.basket.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("basket", JSON.stringify(basket));
      return { ...state, cart: { ...state.cart, basket } };
    }
    //clear cart
    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, basket: [] } };
    //sign
    case "SIGNIN_USER":
      return { ...state, user: action.payload };
    //sign-out
    case "USER_SIGNOUT":
      return {
        ...state,
        user: null,
        basket: [],
        shippingAddress: {},
      };

    //save shipping address
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

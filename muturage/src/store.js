import { createContext, useReducer } from "react";
import { Link } from "react-router-dom";

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  selectedChat: localStorage.getItem("selectedChat")
    ? JSON.parse(localStorage.getItem("selectedChat"))
    : [],
  chats: localStorage.getItem("chats")
    ? JSON.parse(localStorage.getItem("chats"))
    : [],
  cart: {
    visitorsInfo: localStorage.getItem("visitorsInfo")
      ? JSON.parse(localStorage.getItem("visitorsInfo"))
      : {},
    addressInfo: localStorage.getItem("addressInfo")
      ? JSON.parse(localStorage.getItem("addressInfo"))
      : {},
    stayingInfo: localStorage.getItem("stayingInfo")
      ? JSON.parse(localStorage.getItem("stayingInfo"))
      : {},
    contractInfo: localStorage.getItem("contractInfo")
      ? JSON.parse(localStorage.getItem("contractInfo"))
      : {},
    rentInfo: localStorage.getItem("rentInfo")
      ? JSON.parse(localStorage.getItem("rentInfo"))
      : {},
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INJIRA":
      return { ...state, userInfo: action.payload };
    case "SELECT_CHAT":
      return { ...state, selectedChat: action.payload };
    case "GET_CHATS":
      return { ...state, chats: action.payload };
    case "IYANDIKISHE":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        selectedChat: null,
        chats: null,
      };

    case "SIBA":
      return {
        ...state,
        cart: {
          ...state.cart,
          visitorsInfo: {},
          rentInfo: {},
          receiverInfo: [],
          contractInfo: {},
          stayingInfo: {},
          addressInfo: {},
        },
      };

    case "VISITOR_INFO":
      return {
        ...state,
        cart: { ...state.cart, visitorsInfo: action.payload },
      };
    case "ADDRESS_INFO":
      return { ...state, cart: { ...state.cart, addressInfo: action.payload } };
    case "STAYING_INFO":
      return { ...state, cart: { ...state.cart, stayingInfo: action.payload } };
    case "CONTRACT_INFO":
      return {
        ...state,
        cart: { ...state.cart, contractInfo: action.payload },
      };

    case "RENT_INFO":
      return { ...state, cart: { ...state.cart, rentInfo: action.payload } };

    case "RECEIVER_INFO":
      return {
        ...state,
        cart: { ...state.cart, receiverInfo: action.payload },
      };

    default:
      return { ...state };
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  if (!state.userInfo) {
    <Link to="/" />;
  } else {
    <Link to="/home" />;
  }
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

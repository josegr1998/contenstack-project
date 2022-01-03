import { useContext, createContext, useReducer } from "react";
import { reducer } from "../Reducer/AppReducer";

const AppContext = createContext();

const initialState = {
  allProducts: [],
  filteredProducts: [],
  maxPrice: 0,
  cart: [],
  isCartOpen: false,
  totalAmount: 0,
  totalItems: 0,
  selectedTag: "all",
  language: "en-us",
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeLanguage = (value) => {
    console.log(value);
    dispatch({ type: "CHANGE_LANGUAGE", payload: value });
  };

  const searchProducts = (value) => {
    dispatch({ type: "SEARCH_PRODUCTS", payload: value });
  };

  const setPrice = (value, type) => {
    if (type === "min") {
      dispatch({ type: "SET_PRICE", payload: { price: value, type: "min" } });
    }
    if (type === "max") {
      dispatch({ type: "SET_PRICE", payload: { price: value, type: "max" } });
    }
  };

  const freeShiping = (value) => {
    dispatch({ type: "SET_FREE_SHIPING", payload: value });
  };

  const setAllProducts = (products) => {
    console.log("im the reducer", products);
    dispatch({ type: "SET_ALL_PRODUCTS", payload: products });
  };

  const addToCart = (productID) => {
    console.log(productID);
    dispatch({ type: "ADD_TO_CART", payload: productID });
  };

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" });
  };

  const openCart = () => {
    dispatch({ type: "OPEN_CART" });
  };

  const deleteCartItem = (id) => {
    dispatch({ type: "DELETE_CART_ITEM", payload: id });
  };

  const toggleAmount = (id, type) => {
    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
  };

  const getTotal = () => {
    dispatch({ type: "GET_TOTAL" });
  };

  const changeCategory = (value) => {
    dispatch({ type: "CATEGORY_FILTER", payload: value });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setAllProducts,
        searchProducts,
        setPrice,
        freeShiping,
        addToCart,
        closeCart,
        openCart,
        deleteCartItem,
        toggleAmount,
        getTotal,
        changeCategory,
        changeLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

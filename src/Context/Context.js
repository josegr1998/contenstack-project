import { useContext, createContext, useReducer } from "react";
import { reducer } from "../Reducer/AppReducer";

const AppContext = createContext();

const initialState = {
  allProducts: [],
  filteredProducts: [],
  maxPrice: 0,
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  return (
    <AppContext.Provider
      value={{
        ...state,
        setAllProducts,
        searchProducts,
        setPrice,
        freeShiping,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

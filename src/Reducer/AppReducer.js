export const reducer = (state, action) => {
  if (action.type === "SET_ALL_PRODUCTS") {
    const allPrice = action.payload.map((item) => {
      return item.price;
    });

    const maxPrice = Math.max(...allPrice);

    return {
      ...state,
      allProducts: action.payload,
      filteredProducts: action.payload,
      maxPrice,
    };
  }
  if (action.type === "SEARCH_PRODUCTS") {
    return {
      ...state,
      filteredProducts: state.allProducts.filter((product) => {
        if (
          product.product_title
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        ) {
          return product;
        }
      }),
    };
  }

  if (action.type === "SET_PRICE") {
    let newFilteredProducts = state.allProducts;
    if (action.payload.type === "min") {
      newFilteredProducts = state.allProducts.filter((product) => {
        if (product.price >= action.payload.price) {
          return product;
        }
      });
    }
    if (action.payload.type === "max") {
      newFilteredProducts = state.allProducts.filter((product) => {
        if (product.price <= action.payload.price) {
          return product;
        }
      });
    }

    return { ...state, filteredProducts: newFilteredProducts };
  }
  if (action.type === "SET_FREE_SHIPING") {
    return {
      ...state,
      filteredProducts: action.payload
        ? state.allProducts.filter((product) => {
            if (product.free_shiping) {
              return product;
            }
          })
        : state.allProducts,
    };
  }

  if (action.type === "CLOSE_CART") {
    return { ...state, isCartOpen: false };
  }

  if (action.type === "OPEN_CART") {
    return { ...state, isCartOpen: true };
  }
  if (action.type === "ADD_TO_CART") {
    const tempItem = state.cart.find((item) => {
      if (item.uid === action.payload) {
        return item;
      }
    });

    if (tempItem) {
      const newCart = state.cart.map((item) => {
        if (tempItem.uid === item.uid) {
          item.amount++;
          return item;
        } else {
          return item;
        }
      });

      return { ...state, cart: newCart };
    } else {
      const newItem = state.allProducts.find((item) => {
        if (item.uid === action.payload) {
          return item;
        }
      });
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  return { ...state };
};

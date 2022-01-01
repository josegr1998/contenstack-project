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
  return { ...state };
};

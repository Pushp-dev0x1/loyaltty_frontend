import { createSlice } from "@reduxjs/toolkit";

const cartData = localStorage.getItem("cart");
const cartArray = cartData ? JSON.parse(cartData) : [];
function allItems(data) {
  let items = 0;
  for (let i = 0; i < data.length; i++) {
    items += data[i].quantity;
  }
  return items;
}
function calcuateTotal(data) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data[i].price * data[i].quantity;
  }
  return total;
}
function calcuateTotalship(data) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total +=  data[i].shipping || 0;
  }
  return total;
}
const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart: cartArray.length > 0 ? cartArray : [],
    items: cartArray.length > 0 ? allItems(cartArray) : 0,
    total: cartArray.length > 0 ? calcuateTotal(cartArray) : 0,
    totalshipping:cartArray.length > 0 ? calcuateTotalship(cartArray) : 0,
  },
  reducers: {
    addCart: (state, { payload }) => {
      state.cart.push(payload);
      state.items += payload.quantity;
      state.total +=
        payload.price * payload.quantity;
    },
    incQuantity: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find) {
        find.quantity += 1;
        state.items += 1;
        state.total += find.price;
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decQuantity: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find && find.quantity > 1) {
        find.quantity -= 1;
        state.items -= 1;
        state.total -= find.price;
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeItem: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find) {
        const index = state.cart.indexOf(find);
        state.items -= find.quantity;
        state.total -= find.price * find.quantity;
        state.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    emptyCart: (state) => {
      state.cart = [];
      state.items = 0;
      state.total = 0;
      localStorage.setItem("cart", "");
    },
  },
});
export const { addCart, incQuantity, decQuantity, removeItem, emptyCart } =
  cartReducer.actions;
export default cartReducer.reducer;

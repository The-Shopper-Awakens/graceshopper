import Axios from "axios";

const initialState = [];

const SET_PRODUCTS = "SET_PRODUCTS";
const GET_PRODUCTS = "GET_PRODUCTS";

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};


export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get("/api/product");
      dispatch(setProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
};


export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}

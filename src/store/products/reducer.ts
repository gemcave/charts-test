import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../utils/common";
import { ProductsState, IProduct, TCategories } from "./product.interface";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    loading: false,
    hasErrors: false,
    filter: "smartphones",
  } as ProductsState,
  reducers: {
    getProductsPending: (state) => {
      state.loading = true;
    },
    getProductsSuccess: (state, { payload }: { payload: IProduct[] }) => {
      state.allProducts = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getProductsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    setFilter: (state, { payload }: { payload: TCategories }) => {
      state.filter = payload;
    },
  },
});

export function fetchProducts() {
  return async (dispatch: any) => {
    dispatch(getProductsPending());
    try {
      const data = await getAllProducts();
      dispatch(getProductsSuccess(data.products));
    } catch (error) {
      dispatch(getProductsFailure());
    }
  };
}

export const {
  getProductsFailure,
  getProductsSuccess,
  getProductsPending,
  setFilter,
} = productsSlice.actions;
export default productsSlice.reducer;

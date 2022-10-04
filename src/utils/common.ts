import { TCategories } from "../store/products/product.interface";

const url = "https://dummyjson.com/products";

export const getAllProducts = async () => {
  const res = await fetch(url);
  const data = res.json();

  return data;
};

export const getProductsByCategory = async (category: TCategories) => {
  const res = await fetch(`${url}/category/${category}`);
  const data = res.json();

  return data;
};

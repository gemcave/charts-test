export type TCategories = "laptops" | "smartphones";

export interface IProduct {
  brand: string;
  title: string;
  rating: number;
  category: string;
}

export interface ProductsState {
  allProducts: IProduct[] | [];
  loading: boolean;
  hasErrors: boolean;
  filter: TCategories;
}

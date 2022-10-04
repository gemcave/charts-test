import React, { useEffect, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./App.module.css";
import { Dropdown } from "./components/elements/Dropdown";
import { useSelector } from "react-redux";
import { TCategories, IProduct } from "./store/products/product.interface";
import { fetchProducts, setFilter } from "./store/products/reducer";
import { RootState } from "./store";
import { useAppDispatch } from "./store/hooks";
import { Loader } from "./components/elements/Loader";

const selectOptions = [
  { label: "ноутбуки", value: "laptops" },
  { label: "смартфоны", value: "smartphones" },
];

function App() {
  const { filter, loading, hasErrors } = useSelector(
    (state: RootState) => state.products
  );
  const [category, setCatergory] = React.useState<TCategories>(() => filter);
  const products = useSelector((state: RootState) => {
    if (!state.products.allProducts?.length) return state.products.allProducts;

    return state.products.allProducts.filter(
      (p: IProduct) => p.category === state.products.filter
    );
  });
  const dispatch = useAppDispatch();

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "column",
      },
      title: {
        text: "Рейтинг",
      },
      xAxis: {
        categories: products.map((product) => product.title),
      },
      yAxis: {
        title: {
          text: `Рейтинг ${filter === "laptops" ? "ноутбуков" : "смартфонов"}`,
        },
      },
      series: [
        {
          name: "Рейтинг",
          data: products.map((product) => product.rating),
        },
      ],
      colors: ["#058DC7", "#50B432", "#ED561B", "#DDDF00", "#24CBE5"],
      plotOptions: {
        column: {
          colorByPoint: true,
        },
      },
    }),
    [products, filter]
  );

  const handleChange = (event: any) => {
    setCatergory(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFilter(category));
  }, [dispatch, category]);

  if (hasErrors) {
    return <div className={styles.error}>😢 Ошибка!</div>;
  }

  return (
    <div className={styles.app}>
      <div className={styles.chart}>
        {loading ? (
          <Loader color="rgb(124, 181, 236)" />
        ) : (
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        )}
      </div>
      <Dropdown
        name="category"
        label="Категория:"
        options={selectOptions}
        value={category}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;

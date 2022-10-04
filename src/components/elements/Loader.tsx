import React from "react";
import styles from "./Loader.module.css";

export const Loader: React.FC<{ color?: string }> = ({ color = "#ff3d00" }) => {
  return (
    <div className={styles.loader} style={{ borderBottomColor: color }}></div>
  );
};

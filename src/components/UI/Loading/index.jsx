import styles from "./index.module.css";
const Loading = () => {
  return (
    <div className={styles.fullContainer}>
      <img src={"./logo2.svg"} alt="Cargando..." />
    </div>
  );
};

export default Loading;

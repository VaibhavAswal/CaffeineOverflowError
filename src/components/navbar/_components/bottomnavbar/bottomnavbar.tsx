import Sidemenu from "../sidemenu/sidemenu";
import styles from "./bottomnavbar.module.css";

const Bottomnavbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.list}>list</div>
      <div className={styles.menu}>
        <Sidemenu />
      </div>
    </div>
  );
};

export default Bottomnavbar;

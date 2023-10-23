import React from "react";
import Search from "../search/search";
import Profile from "../profilebutton/profile";
import styles from "./topnavbar.module.css";

const Topnavbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>logo</div>
      <div className={styles.search}>
        <Search />
      </div>
      <Profile />
    </div>
  );
};

export default Topnavbar;

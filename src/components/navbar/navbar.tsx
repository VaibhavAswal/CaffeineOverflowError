import React from "react";
import styles from "./navbar.module.css";
import Topnavbar from "./_components/topnavbar/topnavbar";
import Bottomnavbar from "./_components/bottomnavbar/bottomnavbar";

const Navbar = () => {
  return (
    <>
      <Topnavbar />
      <Bottomnavbar />
    </>
  );
};

export default Navbar;

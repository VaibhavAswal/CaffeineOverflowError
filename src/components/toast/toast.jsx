"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

const Toast = () => {
  const [domLoaded, setDomLoaded] = React.useState(false);

  React.useEffect(() => {
    setDomLoaded(true);
  }, []);

  return <>{domLoaded && <Toaster />}</>;
};

export default Toast;

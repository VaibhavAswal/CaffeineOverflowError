"use client";
import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Loading from "@/components/dotLoading/loading";
import axios from "axios";

const loginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passError, setPassError] = React.useState("");
  const [mailError, setMailError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      const mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!mailRegex.test(email)) {
        setMailError("Please enter a valid email address !");
      }
      if (!password) {
        setPassError("Please enter a valid password !");
        return;
      }
      if (mailError) {
        return;
      }
      axios
        .post("/api/auth/login", {
          email,
          password,
        })
        .then((res) => {
          console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setPassError(
            err.response.data.message
              ? err.response.data.message
              : "Something went wrong ! Please try again"
          );
          setLoading(false);
        });
    } catch (error: any) {
      setPassError(
        error.message
          ? error.message
          : "Something went wrong ! Please try again"
      );
      setLoading(false);
    }
  };
  React.useEffect(() => {
    if (password) {
      setPassError("");
    }
    const mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (mailRegex.test(email)) {
      setMailError("");
    }
  }, [email, password]);
  return (
    <>
      <h2 className={styles.heading}>Login to your account</h2>
      <p className={styles.subheading}>Enter your credentials to continue</p>
      <input
        type="email"
        placeholder="name@example.com"
        id="email"
        name="email"
        className={styles.email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className={styles.error}>{mailError}</p>
      <input
        type="password"
        placeholder="Password"
        id="password"
        name="password"
        className={styles.password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className={styles.error}>{passError}</p>
      <button
        disabled={loading}
        className={styles.button}
        onClick={handleLogin}
      >
        {!loading && "Login"}
        {loading && <Loading />}
      </button>
      <p className={styles.link}>
        Don't have an account? <Link href="/register">Register here</Link>
      </p>
      <p className={styles.altText}>
        By clicking continue, you agree to our{" "}
        <Link href="/policies/toc">Terms of Service</Link> and{" "}
        <Link href="/policies/privacypolicy">Privacy Policy</Link>.
      </p>
    </>
  );
};

export default loginForm;

"use client";
import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Loading from "@/components/dotLoading/loading";

const registerForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [passError, setPassError] = React.useState("");
  const [mailError, setMailError] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async (e: any) => {
    try {
      const mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!mailRegex.test(email)) {
        setMailError("Please enter a valid email address !");
      }
      if (!firstName || !lastName) {
        setNameError("Please enter first name and last name !");
        return;
      }
      if (!password) {
        setPassError("Please enter a valid password !");
        return;
      }
      if (mailError || nameError) {
        return;
      }

      e.preventDefault();
      setLoading(true);
      console.log(email, password);
    } catch (error: any) {
      setPassError(error.message);
    } finally {
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
      <h2 className={styles.heading}>Create an account</h2>
      <p className={styles.subheading}>Fill up the details below to continue</p>
      <div className={styles.name}>
        <input
          type="text"
          placeholder="first name"
          id="firstName"
          name="firstName"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="last name"
          id="lastName"
          name="lastName"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <p className={styles.error}>{nameError}</p>
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
        onClick={handleRegister}
      >
        {!loading && "Register"}
        {loading && <Loading />}
      </button>
      <p className={styles.link}>
        Already having an account? <Link href="/login">Login here</Link>
      </p>
      <p className={styles.altText}>
        By clicking continue, you agree to our{" "}
        <Link href="/policies/toc">Terms of Service</Link> and{" "}
        <Link href="/policies/privacypolicy">Privacy Policy</Link>.
      </p>
    </>
  );
};

export default registerForm;

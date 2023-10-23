"use client";
import { useSearchParams } from "next/navigation";
import Loading2 from "@/components/dotLoading/loading2";
import React from "react";
import styles from "./page.module.css";
import axios from "axios";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const verify = () => {
    try {
      const token = searchParams.get("token");
      console.log(token);
      axios
        .post("/api/auth/verify", {
          token: token,
        })
        .then((res) => {
          setEmail(res.data.email);
          setSuccess(true);
          setLoading(false);
          console.log(res.data);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    } catch (error: any) {
      setLoading(false);
      setError(true);
      toast.error(error.message ? error.message : "Some error occured!");
    }
  };

  React.useEffect(() => {
    verify();
  }, []);
  return (
    <>
      {loading && (
        <div className={styles.loading}>
          <Loading2 />
        </div>
      )}
      {error && (
        <>
          <h3 className={styles.errorHeading}>Ooops!</h3>
          <p className={styles.errorSubheading}>
            Link expired or invalid link. Login to your account and request a
            new one
          </p>
        </>
      )}
      {success && (
        <>
          <h3 className={styles.errorHeading}>Success</h3>
          <p className={styles.errorSubheading}>
            Your email {email} has been verified successfully. You can now close
            this window and login to your account
          </p>
        </>
      )}
    </>
  );
};

export default VerifyEmail;

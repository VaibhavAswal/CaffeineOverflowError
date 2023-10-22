"use client";
import { login } from "@/redux/features/authSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./page.module.css";
import Loading from "@/components/dotLoading/loading";
import Image from "next/image";
import toast from "react-hot-toast";

const EmailVerifyPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.authReducer.value);
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [resendLoading, setResendLoading] = React.useState(false);
  const getData = () => {
    try {
      setLoading(true);
      axios
        .get("/api/auth/getdata")
        .then((res) => {
          dispatch(
            login({
              email: res.data.data.email,
              isVerified: res.data.data.isVerfied,
              firstName: res.data.data.firstName,
              lastName: res.data.data.lastName,
              id: res.data.data._id,
              isAdmin: res.data.data.isAdmin,
            })
          );

          setTimeout(() => {
            setLoading(false);
          }, 500);
        })
        .catch((err) => {
          if (
            err.response.data.message === "invalid token" ||
            err.response.data.message === "jwt expired" ||
            err.response.data.message === "jwt malformed" ||
            err.response.data.message === "jwt must be provided"
          ) {
            router.push("/login");
          }
          toast.error(err.response.data.message);
          setLoading(false);
        });
    } catch (error: any) {
      toast;
      setLoading(false);
    }
  };
  const resendLink = () => {
    try {
      setResendLoading(true);
      axios
        .post("/api/auth/getverification")
        .then((res) => {
          toast.success(res.data.message);
          setResendLoading(false);
        })
        .catch((err) => {
          if (
            err.response.data.message === "invalid token" ||
            err.response.data.message === "jwt expired" ||
            err.response.data.message === "jwt malformed" ||
            err.response.data.message === "jwt must be provided"
          ) {
            router.push("/login");
          }
          toast.error(err.response.data.message);
          setResendLoading(false);
        });
    } catch (error: any) {
      toast.error(
        error.message
          ? error.message
          : "Something went wrong ! Please try again"
      );
      setResendLoading(false);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  React.useEffect(() => {
    if (user.isVerified) {
      router.push("/");
    }
  }, [user]);
  return (
    <>
      <h3 className={styles.heading}>Verify your email address</h3>
      <Image
        src="/assets/icons/emailVerify.gif"
        width={150}
        height={150}
        quality={80}
        alt="verif email"
      />
      {!loading && (
        <p className={styles.subheading}>
          We have send a verification link to{" "}
          <span className={styles.email}>{user.email}</span> Please click on the
          link to verify your email address
        </p>
      )}
      <div className={styles.buttons}>
        {!loading && (
          <button
            className={`${styles.button} ${styles.resend}`}
            disabled={resendLoading || loading}
            onClick={resendLink}
          >
            {resendLoading ? "Sending" : "Resend Link"}
            {resendLoading && <Loading />}
          </button>
        )}
        {!resendLoading && (
          <button
            className={`${styles.button} ${styles.refresh}`}
            onClick={getData}
            disabled={loading}
          >
            {loading ? "loading" : "Refresh"}
          </button>
        )}
      </div>
    </>
  );
};

export default EmailVerifyPage;

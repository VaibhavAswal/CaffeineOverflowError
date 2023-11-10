"use client";
import axios from "axios";
import styles from "./profile.module.css";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/authSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import Loading from "@/components/dotLoading/loading";
import { FaRegUser } from "react-icons/fa";

const Profile = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const user = useAppSelector((state) => state.authReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    const getData = () => {
      try {
        setLoading(true);
        axios
          .get("/api/auth/getdata")
          .then((res) => {
            if (!res.data.data.isVerfied) {
              router.push("/account/verify");
            }
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
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } catch (error: any) {
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, [dispatch, router]);
  return (
    <div className={styles.profile}>
      {loading && <Loading />}
      {!loading && !user.id && (
        <p className={styles.signin} onClick={() => router.push("/login")}>
          Sign In
        </p>
      )}
      {!loading && user.id && (
        <div>
          <FaRegUser />
        </div>
      )}
    </div>
  );
};

export default Profile;

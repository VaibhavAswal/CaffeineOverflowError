"use client";
import { useAppSelector } from "@/redux/store";
const ProfilePage = () => {
  const user = useAppSelector((state) => state.authReducer.value);
  return <div>page</div>;
};

export default ProfilePage;

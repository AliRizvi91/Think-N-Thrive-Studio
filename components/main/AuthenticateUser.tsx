"use client";
import React, { useEffect, useRef } from "react";
import { setCredentials, clearToken } from "@/react_redux/slices/UserSlice";
import { useAppDispatch, useAppSelector } from "../reduxComponents/ReduxHook";
import { getme } from "@/react_redux/thunks/UserThunks";

interface AuthenticateUserProps {
  children: React.ReactNode;
}

function AuthenticateUser({ children }: AuthenticateUserProps) {
  const dispatch = useAppDispatch();
  const { token, user, loading, error } = useAppSelector(
    (state) => state.StoreOfUser
  );

  // ✅ Guards
  const authCheckedRef = useRef(false);
  const getMeCalledRef = useRef(false);

  // Listen to localStorage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        if (e.newValue) {
          const newToken = e.newValue;

          dispatch(
            setCredentials({
              user: user || { _id: "", email: "", name: "" },
              token: newToken,
            })
          );

          if (newToken && !getMeCalledRef.current) {
            dispatch(getme());
            getMeCalledRef.current = true;
          }
        } else {
          dispatch(
            setCredentials({ user: { _id: "", email: "", name: "" }, token: "" })
          );
          getMeCalledRef.current = false; // reset for next login
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);

  // Fetch user on mount if token exists
  useEffect(() => {
    if (token && !getMeCalledRef.current) {
      dispatch(getme());
      getMeCalledRef.current = true;
    }
  }, [dispatch, token]);

  // Handle 401/403 errors
  useEffect(() => {
    if (error && (error.status === 401 || error.status === 403)) {
      dispatch(clearToken());
      getMeCalledRef.current = false;
    }
  }, [error, dispatch]);

  // Mark auth checked once
  useEffect(() => {
    if (!authCheckedRef.current) {
      dispatch({ type: "user/authChecked", payload: true });
      authCheckedRef.current = true;
      console.log("authChecked");
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default AuthenticateUser;

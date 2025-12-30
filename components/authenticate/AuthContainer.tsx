"use client"
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useAppDispatch, useAppSelector } from "../reduxComponents/ReduxHook";
import { login, LoginData } from "@/react_redux/thunks/UserThunks";
import { toast } from "sonner";


const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.StoreOfUser);

  const handleLogin = async (data: LoginData) => {
    try {
      const result = await dispatch(login(data)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };


  const switchToSignup = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-tr from-[#ff6ef388] via-[#ffffff] to-[#62f5ffa2]">
      <AnimatePresence mode="wait">
        {isLogin ? (
          <LoginForm
            key="login"
            onLogin={handleLogin}
            onSwitch={switchToSignup}
            isLoading={loading}
            error={error?.message}
          />
        ) : (
          <SignupForm
            key="signup"
            onSwitch={switchToLogin}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthContainer;
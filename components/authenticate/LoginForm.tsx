"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { LoginData } from "./types/auth";
import { IoEye, IoMailUnreadOutline, IoLockClosed } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "../oAuth/GoogleLoginButton";

interface Props {
  onSwitch: () => void;
  onLogin: (data: LoginData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

const LoginForm: React.FC<Props> = ({
  onSwitch,
  onLogin,
  isLoading = false,
  error = "",
}) => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!validateForm()) return;

    await onLogin(formData);
    // router.push("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-black/5 p-8 rounded-2xl shadow-lg w-96"
    >
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

      {error && (
        <div className="mb-4 p-2 bg-red-500/20 border border-red-500 rounded text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full">
        {/* Email */}
        <div className="mb-3 relative">
          <IoMailUnreadOutline className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 pl-10 rounded bg-black/10 outline-none"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => setTouched({ ...touched, email: true })}
            disabled={isLoading}
          />
          {errors.email && touched.email && (
            <p className="text-red-400 text-xs">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <IoLockClosed className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 pl-10 pr-10 rounded bg-black/10 outline-none"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            onBlur={() => setTouched({ ...touched, password: true })}
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoMdEyeOff /> : <IoEye />}
          </button>

          {errors.password && touched.password && (
            <p className="text-red-400 text-xs">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          className="w-full bg-black text-white py-3 rounded font-semibold cursor-pointer"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </motion.button>
      </form>

      {/* Switch */}
      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <span
          onClick={onSwitch}
          className="text-pink-500 hover:text-pink-700 cursor-pointer"
        >
          Sign Up
        </span>
      </p>

      <div className="my-6 h-px bg-black/30" />
      <GoogleLoginButton />
    </motion.div>
  );
};

export default LoginForm;

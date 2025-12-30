"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { AppDispatch } from "@/react_redux/store";
import { signup } from "@/react_redux/thunks/UserThunks";
import ImageUploader from "../pocket/ImageUploader";
import Avatar from "../pocket/ProfileButton";
import { useDispatch } from "react-redux";
import { IoLockClosed } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoMailUnreadOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

interface Props {
  onSwitch: () => void;
}

const SignupForm: React.FC<Props> = ({ onSwitch }) => {
  const dispatch: AppDispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    general: ""
  });
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: null as File | null,
  });

  const validateForm = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      general: ""
    };

    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched({ ...touched, [field]: true });
    validateForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      username: true,
      email: true,
      password: true
    });

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({ ...errors, general: "" });

    try {
      const result = await dispatch(
        signup({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          image: formData.image || undefined,
        })
      );

      if (signup.fulfilled.match(result)) {
        setFormData({
          username: "",
          email: "",
          password: "",
          image: null,
        });

        window.location.href = "/";
      }

    } catch (error: any) {
      setErrors({ ...errors, general: error.message || "Signup failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-white/5 p-8 rounded-2xl shadow-lg w-96 text-black flex flex-col justify-center items-center"
    >
      <h1 className="text-3xl font-bold text-center mb-2 select-none">Sign Up</h1>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full h-full my-4 flex justify-center items-center">
          <ImageUploader
            defaultImageComponent={<Avatar />}
            onImageSelect={(file) => setFormData({ ...formData, image: file })}
          />
        </div>

        {errors.general && (
          <div className="mb-4 p-2 bg-red-500/20 border border-red-500 rounded text-sm">
            {errors.general}
          </div>
        )}

        <div className="mb-3 relative select-none">
          <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 " size={20} />
          <input
            type="text"
            placeholder="Username"
            className={`w-full p-3 pl-10 rounded-[5px] bg-black/10 text-black outline-none ${errors.username && touched.username ? "border border-red-500" : "border-none"
              }`}
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            onBlur={() => handleBlur("username")}
          />
          {errors.username && touched.username && (
            <p className="text-red-400 text-xs mt-1">{errors.username}</p>
          )}
        </div>

        <div className="mb-3 relative select-none">
          <IoMailUnreadOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 " size={20} />
          <input
            type="email"
            placeholder="Email"
            className={`w-full p-3 pl-10 rounded-[5px] bg-black/10 text-black outline-none ${errors.email && touched.email ? "border border-red-500" : "border-none"
              }`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => handleBlur("email")}
          />
          {errors.email && touched.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-6 relative select-none">
          <div className="relative">
            <IoLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2  cursor-pointer" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full p-3 pl-10 pr-10 rounded-[9px] bg-black/10 text-black outline-none transition-all duration-200 ${errors.password && touched.password ? "border border-red-500" : "border-transparent"
                }`}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onBlur={() => handleBlur("password")}
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2  hover:text-black transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <IoMdEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>
          )}
        </div>

        <motion.button
          type="submit"
          whileHover={!isLoading ? { scale: 1.02, backgroundColor: "#000000" } : {}}
          whileTap={!isLoading ? { scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className={`select-none w-full bg-black text-white py-3 rounded font-semibold shadow-sm cursor-pointer uppercase flex justify-center items-center`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            "Sign Up"
          )}
        </motion.button>
      </form>

      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <span
          onClick={onSwitch}
          className="text-pink-500 cursor-pointer hover:font-bold hover:text-pink-700"
        >
          Login
        </span>
      </div>
    </motion.div>
  );
};

export default SignupForm;
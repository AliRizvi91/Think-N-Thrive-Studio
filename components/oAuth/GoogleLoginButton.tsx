"use client";
import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin, UseGoogleLoginOptionsAuthCodeFlow } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion';


interface GoogleLoginResponse {
  token: string;
  // Add other properties if your backend returns more data
}

const GoogleLoginButton = () => {
  const handleGoogleLogin = useGoogleLogin({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    onSuccess: async ({ code }) => { // Get auth code instead of tokens
      try {
        const res = await axios.post<GoogleLoginResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/google-login`,
          { code }, // Send auth code to backend
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          toast.success('Logged in successfully!');
          window.location.href = '/'; // Hard redirect to refresh auth state
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Login failed');
      }
    },
    onError: () => toast.error('Google login failed. Try again.'),
    flow: 'auth-code', // Required for server-side flow
    scope: 'openid profile email', // Minimal scopes needed
  } as UseGoogleLoginOptionsAuthCodeFlow);

  return (
    <motion.button
      initial={{ background: '#0f1210', scale: 1 }}
      whileHover={{ background: '#0f1210ec' }}
      whileTap={{ background: '#0f1210', scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => {
        e.preventDefault();
        handleGoogleLogin();
      }}
      className="flex items-center justify-center gap-3 w-full py-4 px-6 mb-7 text-white rounded-lg font-semibold cursor-pointer"
    >
      <FcGoogle className="w-5 h-5" />
      Continue with Google
    </motion.button>
  );
};

export default GoogleLoginButton;
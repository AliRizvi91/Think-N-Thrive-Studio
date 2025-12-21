'use client'
import React, { useEffect, useState } from 'react';
import { SiMinutemailer } from "react-icons/si";
import type { Metadata } from "next";
import { MdError } from "react-icons/md";
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
// RTK
import { ResendToken, TokenVerification } from '@/react_redux/thunks/UserThunks';

// components
import MiniLoading from '@/components/pocket/MiniLoading';
import { useAppDispatch } from '@/components/reduxComponents/ReduxHook';
import MainButton from '../pocket/MainButton';




// ✅ Metadata (with noindex)
export const metadata: Metadata = {
  title: "Verify Email | Raza Tech Solution",
  description:
    "Secure email verification page for Raza Tech Solution. Please verify your email to continue.",
  robots: {
    index: false, // 👈 prevent search engine indexing
    follow: false,
  },
  openGraph: {
    title: "Verify Email | Raza Tech Solution",
    description:
      "Complete your email verification securely at Raza Tech Solution.",
    url:
      process.env.NEXT_PUBLIC_FRONTEND_BASEURL +
      "/en/verify-email" || "http://localhost:3000/en/verify-email",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Raza Tech Solution Email Verification",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Verify Email | Raza Tech Solution",
    description:
      "Complete your email verification securely at Raza Tech Solution.",
  },
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_FRONTEND_BASEURL +
      "/en/verify-email" || "http://localhost:3000/en/verify-email",
  },
};


// Define types for the verification status
type VerificationStatus = 'pending' | 'success' | 'error';// app/[lang]/(no-nav-footer)/verify-email/page.tsx


function VerificationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const dispatch = useAppDispatch();
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('pending');

  // In VerificationPage component, after successful verification
  useEffect(() => {
    if (token) {
      dispatch(TokenVerification({ token }))
        .unwrap()
        .then((response) => {
          setVerificationStatus('success');
          localStorage.setItem('token', response.token);
          window.dispatchEvent(new Event('storage'));
        })
        .catch(() => setVerificationStatus('error'));

    } else {
      setVerificationStatus('error');
    }
  }, [dispatch, token]);

  const handleResendToken = async () => {
    if (!email || !token) {
      console.error('Email or token is missing');
      return;
    }

    try {
      await dispatch(ResendToken({
        email: email,
        token: token
      })).unwrap();
      // Close the tab after successful dispatch
      window.close();
    } catch (error) {
      // Errors are already handled in the thunk
      console.error('Failed to resend token:', error);
    }
  };

  if (verificationStatus === 'pending') {
    return (
      <MiniLoading />
    );
  }

  if (verificationStatus === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className='w-full h-[100vh] flex flex-col justify-center items-center text-white bg-gradient-to-tr from-black to-[#3d3d3d]'>
        <MdError className='sm:w-50 sm:h-50 w-25 h-25 fill-[#ff0000]' />
        <p className='sm:text-3xl text-2xl font-semibold uppercase text-[#ffffffb6]'>Verification Fail</p>
        <p className='sm:text-[15px] text-[11px] text-center relative top-3' style={{ letterSpacing: '0.5rem' }}>Invalid token.Please try again!.</p>


        <motion.button
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.050 }}
          onClick={handleResendToken}
          className={`w-[30vh] py-4 px-6 my-8 relative top-10 text-white rounded-full font-extrabold cursor-pointer shadow-2xs uppercase bg-gradient-to-tr from-black to-[#3d3d3d] shadow-[#ad3e3e]`}
        >
          Resend Token
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='w-full h-[100vh] flex flex-col justify-center items-center text-white bg-center bg-gradient-to-tr from-[#ff6ef388] via-[#ffffff] to-[#62f5ffa2]'>
      <SiMinutemailer className='sm:w-50 sm:h-50 w-25 h-25 fill-black' />
      <p className='sm:text-3xl text-2xl font-semibold text-[#ff7ee9] uppercase'>Email Verified</p>
      <p className='sm:text-[15px] text-[13px] text-center relative top-3 text-black' style={{ letterSpacing: '0.5rem' }}>You can now close this tab</p>


      <MainButton bgColor="transparent" className='my-8 w-[10vw]' onClick={() => window.close()}>
        Close
      </MainButton>
    </motion.div>
  );
}

export default VerificationPage;
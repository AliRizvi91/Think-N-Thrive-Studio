'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MdError } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";

import { ResendToken, TokenVerification } from '@/react_redux/thunks/UserThunks';
import { useAppDispatch } from '@/components/reduxComponents/ReduxHook';

import MiniLoading from '@/components/pocket/MiniLoading';
import MainButton from '../pocket/MainButton';

type status  = 'pending' | 'success' | 'error';

function VerificationPage() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<status >('pending');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      return;
    }

    dispatch(TokenVerification({ token }))
      .unwrap()
      .then((res) => {
        localStorage.setItem('token', res.token);
        window.dispatchEvent(new Event('storage'));
        setStatus('success');
      })
      .catch(() => {
        setStatus('error');
      });
  }, [dispatch, searchParams]);

  const handleResendToken = async () => {
    const email = searchParams.get('email');
    if (!email) return;

    try {
      await dispatch(ResendToken({ email })).unwrap();
      window.close();
    } catch {}
  };

  if (status  === 'pending') {
    return (
      <MiniLoading />
    );
  }

  if (status  === 'error') {
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
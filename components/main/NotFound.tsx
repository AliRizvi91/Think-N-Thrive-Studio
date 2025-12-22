'use client'
import React from 'react';
import { VscCopilotWarning } from "react-icons/vsc";
import { motion } from 'framer-motion';
import MainButton from '../pocket/MainButton';

function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='w-full h-[100vh] flex flex-col justify-center items-center text-white bg-gradient-to-tr from-black to-[#3d3d3d]'
    >
      <VscCopilotWarning className='sm:w-50 sm:h-50 w-25 h-25 fill-[#ff0000]' />
      <p className='sm:text-3xl text-2xl font-semibold uppercase text-[#ffffffb6] mt-4'>Page Not Found</p>
      <p className='sm:text-[15px] text-[11px] text-center mt-2' style={{ letterSpacing: '0.5rem' }}>
        The page you are looking for does not exist.
      </p>

      <motion.button
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.05 }}
        onClick={() => window.location.href = '/'}
        className='w-[30vh] py-4 px-6 my-8 text-white rounded-full font-extrabold cursor-pointer shadow-2xs uppercase bg-gradient-to-tr from-black to-[#3d3d3d] shadow-[#ad3e3e]'
      >
        Home
      </motion.button>

    </motion.div>
  );
}

export default NotFound;

'use client'
import React from 'react'
import Container from '../pocket/Container'
import { motion } from 'framer-motion'
import { GoGoal } from "react-icons/go";
import '@/app/globals.css'

function AboutPart1() {
  return (
    <Container maxWidth="Exl" className="flex flex-col items-center justify-center">
      {/* Text Section */}
      <div className="grid md:grid-cols-2 grid-cols-1 h-screen w-full ">
      <motion.div 
        className="w-full h-full flex md:justify-start justify-center md:pt-0 pt-40 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <div className="sm:w-[78%] w-full sm:px-0 px-10 space-y-3">
          <h1 className='md:text-6xl sm:text-5xl text-4xl font-bold md:text-start text-center'>
            <span className="text-[#67f8ec] drop-shadow-[0_0_10px_#67f8ec]">Communication</span>, Literature, 
            <span className="text-[#fd67cb] drop-shadow-[0_0_10px_#fd67cb]">Writing</span> & 
            <span className="text-[#67f87f] drop-shadow-[0_0_10px_#67f87f]">Grammar</span>
          </h1>
          <p className='md:text-start text-center text-gray-500 md:text-[17px] sm:text-[16px] text-[15px]'>
            Our courses are designed to help learners excel in English across all areas—whether it’s mastering grammar, acing O/A Levels and competitive exams like MDCAT/ECAT, preparing for IELTS, developing academic and creative writing skills, or enhancing public speaking and presentation abilities. We also offer deep dives into modern and South Asian literature, syntax, and critical discourse analysis, ensuring a comprehensive understanding of the language and its applications.
          </p>
        </div>
      </motion.div>

      {/* SVG Section */}
      <motion.div 
        className="w-full h-full flex md:justify-end justify-center items-center"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <div className="relative w-100 h-100 overflow-hidden select-none">
          <object
            type="image/svg+xml"
            data="/assets/images/About1.svg"
            className="w-full h-full"
            aria-label="About1"
          />
        </div>
      </motion.div>
      </div>

      <div className="w-full relative md:top-[-14vh] sm:top-[5vh] top-[15vh] mt-10">
        
        <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="lg:w-[75%] w-full bg-gradient-to-tl from-[#f7a1ff73] via-[#f9a7fc3a] rounded-t-4xl rounded-b-sm lg:px-50 sm:px-20 px-5 py-10 relative mx-auto my-1 flex flex-col justify-center items-center">
            <div className="h-20 border-[1px]  border-black mb-10"></div>
            <h1 className='text-5xl Ballet text-black mb-7 text-center'>Sania Munir</h1>
            <p className='md:text-[17px] sm:text-[16px] text-[15px] text-center font-thin'>I recently completed my IELTS preparation with Think n Thrive Studio. I am genuinely delighted with my experience and the progress I’ve made. The expert guidance provided by Ms. Nimra and Ms. Farzeen was exceptional—they understood my strengths and weaknesses and tailored the lessons to fit my needs perfectly. Their teaching methods were clear, engaging, and highly effective.

The study resources were comprehensive, the practice tests were incredibly accurate, and the overall learning environment was motivating and supportive. With every class, I felt my confidence growing—not just in the test format but in my overall command of the English language.

Thanks to Think n Thrive Studio, I now feel fully prepared and empowered for my IELTS test. I couldn’t have asked for a better learning experience. Highly recommended for anyone aiming to achieve their best score!</p>
        </motion.div>
        <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
         className="lg:w-[75%] w-full relative mx-auto bg-gradient-to-tl from-[#000000] to-[#000000a2] rounded-t-sm lg:px-50 sm:px-20 px-5 py-5">
            <GoGoal className='text-[#ffffff] relative mx-auto mb-5 text-4xl'/>
      <p className=' md:text-[17px] sm:text-[16px] text-[15px] text-center font-thin select-none text-white'>To provide personalized, high-quality learning experiences that support every student’s growth, potential, and pride in mastering the English language.</p>
        </motion.div>
      </div>
    </Container>
  )
}

export default AboutPart1

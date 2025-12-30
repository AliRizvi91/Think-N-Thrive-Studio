'use client'
import { motion } from 'framer-motion'
import React from 'react'
import Link from 'next/link';
import { useAppDispatch } from '../reduxComponents/ReduxHook';
import { BsTwitterX } from "react-icons/bs";
import { AiFillGoogleCircle, AiFillInstagram } from "react-icons/ai";
function Footer() {
    const dispatch = useAppDispatch();

    const items = [
        { name: 'Home', path: '/' }, 
        { name: 'About', path: '/about' }, 
        { name: 'Contact', path: '/contact' }
    ];
    
    const icons = [
        { icon: <BsTwitterX />, path: '#' }, 
        { icon: <AiFillInstagram />, path: 'https://www.instagram.com/thinknthrive_studio?igsh=MWZ3YXIzcHg2cDdjZg==' },
        { icon: <AiFillGoogleCircle />, path: '#' }, 
    ];


    return (
        <footer className="bg-[length:4px_4px] bg-[radial-gradient(circle_1px_at_1px_1px,#42424240_1px,transparent_0)] bg-[#080808] w-full py-4 px-4 pt-10 relative z-1">
            <div className="flex flex-col justify-center items-center gap-6 max-w-6xl mx-auto">

                {/* Navigation */}
                <motion.div
                    className="w-full relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="flex justify-center items-center flex-wrap gap-6 sm:gap-8 md:gap-9 lg:gap-12 w-full">
                        {items.map((item, index) => (
                            <Link 
                                href={item.path}
                                key={index}
                                className="text-gray-400 hover:text-white transition-colors duration-300 text-[12px] md:text-[13px] lg:text-[16px]"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Social Icons */}
                <motion.div
                    className="w-full relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="flex justify-center items-center flex-wrap gap-4 md:gap-6 lg:gap-8 w-full">
                        {icons.map((item, index) => (
                            <Link 
                                href={item.path}
                                key={index}
                                className="text-gray-400 hover:text-white transition-colors duration-300 text-2xl md:text-3xl lg:text-4xl"
                            >
                                {item.icon}
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div
                    className="text-gray-500 text-center max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <p className="text-sm md:text-base text-sky-400/30 italic">--------- thinknthrivestudiotnts@gmail.com ---------</p>
                    <p className="text-sm md:text-base">© Think <span className='text-sky-400 italic'>N</span> Thrive Studio. Thank you for coming</p>
                </motion.div>

            </div>
        </footer>
    )
}

export default Footer;

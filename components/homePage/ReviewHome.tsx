'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, Variants, useReducedMotion } from 'framer-motion';
import Container from '../pocket/Container';
import { Faqs } from '../pocket/Faqs';
import { getAllReviews } from '@/react_redux/thunks/ReviewThunks';
import { useAppDispatch, useAppSelector } from '../reduxComponents/ReduxHook';
import {IFaq, getAllFaqs } from '@/react_redux/thunks/FaqThunks';





// Hook to detect client-side only
function useIsClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  return mounted;
}


const container: Variants = {
  show: { transition: { staggerChildren: 0.12 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 160, damping: 18 },
  },
};

export default function ReviewHome() {
  const reduce = useReducedMotion();
  const isClient = useIsClient();
  const dispatch = useAppDispatch()
  const {allReviews} = useAppSelector((state)=> state.StoreOfReview)
  const {allFaqs} = useAppSelector((state)=> state.StoreOfFaqs)
  
  const lastSix = allReviews.slice(-4);

          const faqsData = [
  {
    value: "item-1",
    question: "Intuitive user interface designed for both beginners?",
    answer: [
      "Our flagship product combines cutting-edge technology with sleek design.",
      "Key features include advanced processing and an intuitive UI.",
    ],
  },
  {
    value: "item-2",
    question: "Shipping Details",
    answer: [
      "We offer worldwide shipping with trusted partners.",
      "Track your shipment in real-time.",
    ],
  },
  {
    value: "item-3",
    question: "Return Policy",
    answer: [
      "We offer a 30-day return policy.",
      "Free return shipping and fast refunds.",
    ],
  },
]

useEffect(()=>{
  dispatch(getAllReviews())
  dispatch(getAllFaqs())
},[dispatch])

  return (
    <section className="bg-white relative sm:py-15 py-10 pb-25">

      <Container maxWidth="Exl">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="sm:w-[50vw] w-[90vw]">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-black uppercase text-center sm:pb-20 pb-10">
                Reviews
              </h2>
            </div>
          </div>

          <motion.div
            className="grid gap-6 md:grid-cols-2"
            variants={container}
            initial={false}
            whileInView={isClient && !reduce ? 'show' : undefined}
          >
            {lastSix.map((t) => (
              <motion.figure
                key={t._id}
                variants={card}
                initial={false}
                whileInView={isClient && !reduce ? 'show' : undefined}
                whileHover={isClient && !reduce ? { scale: 1.02, y: -6 } : undefined}
                className="flex flex-col items-center justify-center p-6 text-center rounded-2xl bg-gradient-to-tr from-[#ff2f323d] via-[#ff2faf1c] backdrop-blur-sm shadow-sm"
              >
                <blockquote className="max-w-xl mx-auto mb-4 text-sm text-gray-700">
                  <p className="mt-3 leading-relaxed">{t.comment}</p>
                </blockquote>

                <figcaption className="flex items-center justify-center mt-4">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-gray-100 select-none">
                    <Image src={t.user?.image} alt={t.user?.username} className='object-cover' fill sizes="36px" />
                  </div>

                  <div className="ml-3 text-left">
                    <div className="text-sm font-medium text-gray-900">{t.user?.username}</div>
                    <div className="text-xs text-gray-500">{t.user.email}</div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
        
        <div className="pt-[10vh]">
          <div className="flex items-center justify-center">
            <div className="sm:w-[50vw] w-[90vw]">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-black uppercase text-center sm:pb-20 pb-15">
                Faqs
              </h2>
            </div>
          </div>


<Faqs items={allFaqs} />

        </div>
      </Container>
    </section>
  );
}

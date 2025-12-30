"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import MainButton from "./MainButton";
import { useAppDispatch, useAppSelector } from "../reduxComponents/ReduxHook";
import { ICourse, getAllCourses } from "@/react_redux/thunks/CourseThunks";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

/* ================== ANIMATIONS ================== */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45 },
  },
};

/* ================== CARD ================== */

export function CourseCard({ card }: { card: ICourse }) {
  const handleCourseDetail = () => {
    window.open(`/course/${card._id}`, "_blank");
  };

  return (
    <motion.article
      variants={cardVariants}
      className="rounded-2xl overflow-hidden bg-black/10 shadow-lg"
      whileHover={{ scale: 1.04, y: -6 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative h-44 sm:h-48">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute bottom-4 left-4">
          <span className="text-xs text-white/80 uppercase">
            {card.category}
          </span>

          <h4 className="text-white font-semibold mt-1 text-sm sm:text-base">
            {card.title}
          </h4>

          <button
            onClick={handleCourseDetail}
            className="mt-3 text-sm bg-white/10 px-3 py-1 rounded-full text-white border border-white hover:bg-white hover:text-black transition"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ================== MAIN ================== */

export default function CourseCards() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { allCourses, loading } = useAppSelector(
    (state) => state.StoreOfCourse
  );

  /* Fetch courses */
  useEffect(() => {
    if (!allCourses || allCourses.length === 0) {
      dispatch(getAllCourses());
    }
  }, [dispatch, allCourses]);

  const goToCoursesPage = () => {
    router.push("/courses");
  };

  return (
    <section className="min-h-screen bg-[#0f1314] px-6 py-16">
      <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center uppercase mb-16">
        English Mastery Courses
      </h2>

      {/* ====== GRID ====== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"   // 🔥 FIXED
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-[260px] w-full rounded-2xl"
            />
          ))
        ) : allCourses && allCourses.length > 0 ? (
          allCourses.map((course) => (
            <CourseCard key={course._id} card={course} />
          ))
        ) : (
          <p className="text-white col-span-full text-center">
            No courses found
          </p>
        )}
      </motion.div>

      {/* ====== BUTTON ====== */}
      <div className="flex justify-center mt-16">
        <MainButton
          bgColor="#fff"
          borderColor="#fff"
          textColor="#000"
          onClick={goToCoursesPage}
        >
          Courses
        </MainButton>
      </div>
    </section>
  );
}

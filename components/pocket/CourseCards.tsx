import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MainButton from "./MainButton";
import { useAppDispatch, useAppSelector } from "../reduxComponents/ReduxHook";
import { ICourse, getAllCourses } from "@/react_redux/thunks/CourseThunks";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
};

export function CourseCard({ card }: { card: ICourse }) {
  const handleCourseDetail = () => {
    window.open(`/course/${card?._id}`, "_blank");
  };

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ scale: 1.03, y: -6 }}
      whileTap={{ scale: 0.995 }}
      className="rounded-2xl overflow-hidden shadow-lg bg-black/10"
    >
      <div className="relative h-44 sm:h-48">
        <div className="bg-gradient-to-r from-[#00000062] to-[#0000002a] absolute w-full h-full"></div>
        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-4 bottom-4">
          <span className="text-xs text-white/90 uppercase">{card.category}</span>
          <h4 className="text-white font-semibold mt-1 leading-tight text-sm sm:text-base">{card.title}</h4>
          <div className="py-4">
            <button
              onClick={handleCourseDetail}
              className="text-sm bg-white/10 px-3 py-1 rounded-full text-white/90 border border-white hover:bg-white hover:text-black focus:bg-white focus:text-black cursor-pointer transition-colors duration-200"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function CourseCards() {
  const dispatch = useAppDispatch();
  const { allCourses, loading } = useAppSelector((state) => state.StoreOfCourse);
  const [displayCourses, setDisplayCourses] = useState<ICourse[]>([]);
  const router = useRouter();

  const handletoGoCoursePage = () => {
    router.push("/courses");
  };

  // Fetch courses on mount
  useEffect(() => {
    if (!allCourses || allCourses.length === 0) {
      dispatch(getAllCourses());
    }
  }, [dispatch, allCourses]);

  // Update last 6 courses when data changes
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      setDisplayCourses(allCourses.slice(-6));
    }
  }, [allCourses]);

  // Fallback UI if data not ready
  if (loading && displayCourses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1314] flex flex-col items-center justify-center gap-15 py-12 px-6 relative bottom-0">
      <div className="flex items-center justify-center">
        <div className="sm:w-[50vw] w-[90vw]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white uppercase text-center pb-20">
            English Mastery Courses
          </h2>
        </div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <motion.div
          className="lg:col-span-9"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
            {loading ?(    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[20px] w-[100px] rounded-full" />
          ))
        : allCourses.map((course) => (
            <CourseCard key={course._id} card={course} />
          ))}
    </motion.div>) : displayCourses.map((c) => (
              <CourseCard key={c._id} card={c} />
            ))}
          </div>

          <div className="hidden lg:grid grid-cols-3 grid-rows-2 gap-6">
            {loading ? (    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[20px] w-[100px] rounded-full" />
          ))
        : allCourses.map((course) => (
            <CourseCard key={course._id} card={course} />
          ))}
    </motion.div>) : displayCourses.map((c) => (
              <CourseCard key={c._id} card={c} />
            ))}
          </div>
        </motion.div>
      </div>

      <MainButton
        bgColor="#fff"
        borderColor="#fff"
        textColor="#000"
        onClick={handletoGoCoursePage}
      >
        Courses
      </MainButton>
    </div>
  );
}

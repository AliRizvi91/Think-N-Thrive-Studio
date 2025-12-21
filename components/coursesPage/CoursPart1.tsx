'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { CourseCard } from '../pocket/CourseCards'
import { motion } from "framer-motion";
import Container from '../pocket/Container';
import SearchBar from '../pocket/SearchBar';
import { getAllCourses } from "@/react_redux/thunks/CourseThunks";
import { useAppDispatch, useAppSelector } from "../reduxComponents/ReduxHook";

function CoursPart1() {
  const dispatch = useAppDispatch()
  const { allCourses, loading } = useAppSelector(
    (state) => state.StoreOfCourse
  )

  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    dispatch(getAllCourses())
  }, [dispatch])

  const handleSearch = (text: string) => {
    setSearchText(text.toLowerCase())
  }

  // 🔍 Filter logic
  const filteredCourses = useMemo(() => {
    if (!searchText) return allCourses

    return allCourses.filter((course) =>
      course.title.toLowerCase().includes(searchText) ||
      course.description.toLowerCase().includes(searchText)
    )
  }, [allCourses, searchText])

  return (
    <Container
      maxWidth="Exl"
      className="h-full flex flex-col gap-5 items-center"
    >
      {/* ================= HERO ================= */}
      <div className="md:w-[70%] sm:w-[80%] w-full flex flex-col items-center gap-3 pb-10 pt-40">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:text-5xl sm:text-4xl text-3xl text-pink-300 font-extrabold uppercase w-[70%] text-center"
        >
          Explore Our Expert English Courses
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:text-[17px] sm:text-[16px] text-[15px] w-[70%] text-center text-gray-600"
        >
          From grammar mastery and literature studies to IELTS prep, writing skills,
          and public speaking—our courses are designed to help you grow with confidence.
        </motion.p>

        <div className="py-10 px-3 w-full flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* ================= COURSES ================= */}
      <div className="w-full pb-20">
        {loading && (
          <p className="text-center text-gray-500">Loading courses...</p>
        )}

        {!loading && filteredCourses.length === 0 && (
          <p className="text-center text-gray-500">
            No course found
          </p>
        )}

        {/* Mobile / Tablet */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} card={course} />
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} card={course} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default CoursPart1

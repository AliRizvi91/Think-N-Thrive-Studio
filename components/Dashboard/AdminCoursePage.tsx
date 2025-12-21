"use client";

import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../reduxComponents/ReduxHook";
import {
  getAllCourses,
  postCourse,
  updateCourse,
  deleteCourse,
  ICourse,
} from "@/react_redux/thunks/CourseThunks";
import { motion, AnimatePresence } from "framer-motion";

import { MdEdit, MdDelete } from "react-icons/md";

export default function AdminCoursePage() {
  const dispatch = useAppDispatch();
  const { allCourses, loading } = useAppSelector((state) => state.StoreOfCourse);
  
  // ===== Form State =====
  const [courseForm, setCourseForm] = useState<Omit<ICourse, "_id" | "createdAt" | "updatedAt">>({
    image: "",
    title: "",
    description: "",
    category: "English Speaking",
    duration: "",
    author: "",
  });
  
  const [imagePreview, setImagePreview] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Load all courses
  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  // ===== Handlers =====
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      setCourseForm((prev) => ({ ...prev, image: file.name }));
    }
  };

  const handleSubmit = () => {
    if (editId) {
      dispatch(updateCourse({ id: editId, data: courseForm }));
      setEditId(null);
    } else {
      dispatch(postCourse(courseForm));
    }
    setCourseForm({
      image: "",
      title: "",
      description: "",
      category: "English Speaking",
      duration: "",
      author: "",
    });
    setImagePreview("");
  };

  const handleEdit = (course: ICourse) => {
    setEditId(course._id);
    setCourseForm({
      image: course.image || "",
      title: course.title,
      description: course.description,
      category: course.category,
      duration: course.duration,
      author: course.author,
    });
    setImagePreview(course.image || "");
  };

  const handleDelete = (id: string) => setConfirmDeleteId(id);
  const confirmDelete = () => {
    if (confirmDeleteId) dispatch(deleteCourse(confirmDeleteId));
    setConfirmDeleteId(null);
  };

  // ===== Filtered Courses (optional search/filter) =====
  const coursesList = useMemo(() => allCourses, [allCourses]);

  return (
    <div className="min-h-screen p-6 bg-[#1c1c1c] text-white pt-35">
      <div className="max-w-5xl mx-auto space-y-3">
        {/* ===== Course Form ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-1"
        >
          <h2 className="text-xl font-bold">{editId ? "Edit Course" : "Create Course"}</h2>

          {/* Title */}
          <input
            name="title"
            value={courseForm.title}
            onChange={handleChange}
            placeholder="Title"
            className="p-2 rounded-md bg-black/30 focus:outline-none"
          />

          {/* Description */}
          <textarea
            name="description"
            value={courseForm.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 rounded-md bg-black/30 focus:outline-none"
          />

          {/* Category */}
          <select
            name="category"
            value={courseForm.category}
            onChange={handleChange}
            className="p-2 rounded-md bg-black/30 focus:outline-none"
          >
            {[
              "English Speaking",
              "O/A Levels English",
              "MDCAT/ECAT English",
              "IELTS",
              "Literature",
              "Public Speaking",
              "Writing",
              "History",
            ].map((cat) => (
              <option key={cat} value={cat} className="bg-sky-500">{cat}</option>
            ))}
          </select>

          {/* Duration */}
          <input
            name="duration"
            value={courseForm.duration}
            onChange={handleChange}
            placeholder="Duration"
            className="p-2 rounded-md bg-black/30 focus:outline-none"
          />

          {/* Author */}
          <input
            name="author"
            value={courseForm.author}
            onChange={handleChange}
            placeholder="Author"
            className="p-2 rounded-md bg-black/30 focus:outline-none"
          />

          {/* Image */}
          <div className="flex items-center gap-4">
            <input type="file" onChange={handleImageChange} className="bg-pink-500 p-3 rounded-sm cursor-pointer my-2" />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="bg-white hover:bg-white/70 cursor-pointer p-2 text-black rounded-md"
          >
            {editId ? "Update Course" : "Create Course"}
          </button>
          
        </motion.div>

        {/* ===== Courses List ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-4"
        >
          <h2 className="text-xl font-bold">All Courses</h2>

          {loading && <p>Loading...</p>}

          {coursesList.map((course) => (
            <motion.div
              key={course._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/30 p-4 rounded-md flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                {course.image && (
                  <img src={course.image} alt={course.title} className="w-16 h-16 object-cover rounded-md" />
                )}
                <div>
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-400">{course.category} | {course.duration}</p>
                  <p className="text-sm text-gray-400">By {course.author}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="p-2 bg-sky-400 rounded-full hover:bg-sky-600 cursor-pointer"
                >
                  <MdEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="p-2 bg-red-500 rounded-full hover:bg-red-600 cursor-pointer"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ===== Confirm Delete Modal ===== */}
      <AnimatePresence>
        {confirmDeleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-[#1c1c1c] p-6 rounded-2xl flex flex-col gap-4 text-white"
            >
              <p>Are you sure you want to delete this course?</p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="bg-gray-600 hover:bg-gray-700 p-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 p-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

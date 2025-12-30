'use client'

import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/pocket/Container";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { ICourse } from "@/react_redux/thunks/CourseThunks";
import { UIReview } from "@/react_redux/thunks/ReviewThunks";
import { useAppSelector } from "../reduxComponents/ReduxHook";


interface SingleCourseProps {
  course: ICourse;
  reviews: UIReview[];
  onComment: (query: string) => Promise<UIReview>;
  currentUser: {
    username: string;
    image: string;
  };
}

export default function SingleCourse({
  course,
  reviews: initialReviews,
  onComment,
  currentUser,
}: SingleCourseProps) {
  const [query, setQuery] = useState("");
  const [reviews, setReviews] = useState<UIReview[]>(initialReviews);
  const [isPosting, setIsPosting] = useState(false);

  const {user} = useAppSelector((state)=> state.StoreOfUser)

  const handleComment = async () => {
    if (!query.trim() || isPosting) return;

    setIsPosting(true);
    const commentText = query;

    // ✅ optimistic review (NOW VALID)
    const tempReview: UIReview = {
      _id: Date.now().toString(),
      comment: commentText,
      user: {
        username: currentUser.username,
        image: currentUser.image,
      },
    };

    setReviews((prev) => [tempReview, ...prev]);
    setQuery("");

    try {
      const savedReview = await onComment(commentText);

      setReviews((prev) =>
        prev.map((r) => (r._id === tempReview._id ? savedReview : r))
      );
    } catch (err) {
      setReviews((prev) => prev.filter((r) => r._id !== tempReview._id));
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="bg-white">
    <Container maxWidth="Exl" className="flex flex-col gap-8 relative sm:top-[15vh] top-[12vh]">
      {/* Course Image */}
      <div className="relative w-full h-[70vh] rounded-4xl overflow-hidden border-2 border-black select-none">
        <Image src={course.image} alt={course.category} fill className="object-cover" />
      </div>

      {/* Course Info */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold uppercase">{course.title}</h1>

        <div className="flex justify-center gap-1">
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStarHalf className="text-yellow-400" />
        </div>

        <p>{course.description}</p>
        <p className="text-xl">
          <span className="font-semibold">Author:</span>{" "}
          <span className="text-red-500 uppercase italic">{course.author}</span>
        </p>
      </div>

      {/* Reviews */}
      <div className={`${user?._id === '' ? 'pb-50' : ''} space-y-1`}>
        <h2 className="text-3xl font-bold">Student Reviews</h2>

        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-black/80 text-white p-6 rounded-4xl space-y-3"
          >
            <p className="italic">“{review.comment}”</p>

            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden select-none">
                <Image
                  src={
                    review.user?.image ||
                    user?.image
                  }
                  alt="user"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-semibold">
                {review.user?.username || user?.username}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment */}
      {user?._id !== '' && (<div className="relative max-w-xl mx-auto w-full pb-50">
        <AiOutlineComment className="absolute left-4 top-1/2 -translate-y-1/2 text-xl" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Add a comment..."
          className="w-full py-4 pl-8 pr-28 rounded-full border"
          disabled={isPosting}
        />
        <button
          onClick={handleComment}
          disabled={isPosting}
          className="absolute right-2 top-2 bg-black text-white px-5 py-2 rounded-full"
        >
          Post
        </button>
      </div>)}
      
    </Container>
    </div>
  );
}

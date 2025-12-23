'use client'

import { useEffect, use } from "react";
import SingleCourse from "@/components/coursesPage/SingleCourse";
import { useAppDispatch, useAppSelector } from "@/components/reduxComponents/ReduxHook";
import { getCourseById } from "@/react_redux/thunks/CourseThunks";
import { getReviewsByCourse, postReview , UIReview } from "@/react_redux/thunks/ReviewThunks";
import { IReview } from "@/react_redux/thunks/ReviewThunks";

export default function ProductPage(
  props: { params: Promise<{ id: string }> }
) {
  const { id: courseId } = use(props.params);
  const dispatch = useAppDispatch();

  const { currentCourse } = useAppSelector((state) => state.StoreOfCourse);
  const { user } = useAppSelector((state) => state.StoreOfUser);
  const { courseReviews, loading } = useAppSelector(
    (state) => state.StoreOfReview
  );

  useEffect(() => {
    dispatch(getCourseById(courseId));
    dispatch(getReviewsByCourse(courseId));
  }, [dispatch, courseId]);

  // ✅ MAP backend reviews → UI reviews
  const uiReviews: UIReview[] = courseReviews
    .filter((r): r is IReview & { comment: string } => !!r.comment)
    .map((r) => ({
      _id: r._id,
      comment: r.comment,        // now guaranteed string
      user: r.user,
      course: r.course,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));

  // ✅ return UIReview
  const handleComment = async (text: string): Promise<UIReview> => {
    const result = await dispatch(
      postReview({
        user: user!._id,
        course: courseId,
        comment: text,
      })
    ).unwrap();

    // map backend → UI
    return {
      _id: result._id,
      comment: result.comment!, // backend just created it
      user: result.user,
      course: result.course,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  };

  if (loading) return <div>Loading...</div>;
  if (!currentCourse || !user) return <div>Not found</div>;

  return (
    <SingleCourse
      course={currentCourse}
      reviews={uiReviews}         
      onComment={handleComment}    
      currentUser={{
        username: user.username,
        image: user.image,
      }}
    />
  );
}

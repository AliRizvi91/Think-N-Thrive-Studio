"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../reduxComponents/ReduxHook";

import { getAllAdmissions } from "@/react_redux/thunks/AdmissionThunks";
import { getAllContacts } from "@/react_redux/thunks/ContactThunks";
import { getAllReviews, UIReview } from "@/react_redux/thunks/ReviewThunks";
import { ICourse } from "@/react_redux/thunks/CourseThunks";

import { MdClose } from "react-icons/md";
import Image from "next/image";

/* ================= MODAL ================= */

type DetailModalProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    data: any;
};

export const DetailModal = ({ open, onClose, title, data }: DetailModalProps) => {
    if (!open) return null;

    const renderValue = (value: any) => {
        if (value === null || value === undefined) {
            return <span className="text-gray-500">N/A</span>;
        }

        if (Array.isArray(value)) {
            return (
                <div className="ml-4 space-y-2">
                    {value.map((item, index) => (
                        <div key={index} className="border-l border-white/20 pl-3">
                            {renderValue(item)}
                        </div>
                    ))}
                </div>
            );
        }

        if (typeof value === "object") {
            return (
                <div className="ml-4 space-y-1">
                    {Object.entries(value).map(([k, v]) => (
                        <div key={k}>
                            <span className="text-gray-400 capitalize">{k}:</span>{" "}
                            {renderValue(v)}
                        </div>
                    ))}
                </div>
            );
        }

        return <span className="text-gray-200">{String(value)}</span>;
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#1c1c1c] text-white max-w-lg w-full rounded-2xl p-6 space-y-4 overflow-y-auto max-h-[90vh]"
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: 50 }}
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">{title}</h2>
                        <button onClick={onClose} className="hover:text-red-400 transition">
                            <MdClose size={22} />
                        </button>
                    </div>

                    <div className="space-y-3 text-sm text-gray-300">
                        {data ? (
                            Object.entries(data).map(([key, value]) => (
                                <div key={key}>
                                    <span className="text-gray-400 font-semibold capitalize">
                                        {key}:
                                    </span>{" "}
                                    {renderValue(value)}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">No data available</p>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

/* ================= PAGE ================= */

export default function DetailsPage() {
    const dispatch = useAppDispatch();

    const { allAdmissions } = useAppSelector((s) => s.StoreOfAdmission);
    const { allContacts } = useAppSelector((s) => s.StoreOfContact);
    const { allReviews } = useAppSelector((s) => s.StoreOfReview);

    const [selectedAdmission, setSelectedAdmission] = useState<any>(null);
    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [openAdmission, setOpenAdmission] = useState(false);
    const [openContact, setOpenContact] = useState(false);

    useEffect(() => {
        dispatch(getAllAdmissions());
        dispatch(getAllContacts());
        dispatch(getAllReviews());
    }, [dispatch]);

    const reviewsByCourse = useMemo(() => {
        const map: Record<string, { course: ICourse; reviews: UIReview[] }> = {};

        allReviews.forEach((r) => {
            if (!r.course) return;
            const courseId = r.course._id;

            if (!map[courseId]) {
                map[courseId] = { course: r.course, reviews: [] };
            }

            map[courseId].reviews.push(r);
        });

        return map;
    }, [allReviews]);

    return (
        <div className="min-h-screen bg-[#1c1c1c] text-white pt-40 px-4">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* ================= ADMISSIONS ================= */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Admissions</h2>
                    <div className="grid md:grid-cols-2 gap-1">
                        {allAdmissions.map((a) => (
                            <motion.div
                                key={a._id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white/5 rounded-xl p-4 cursor-pointer"
                                onClick={() => {
                                    setSelectedAdmission(a);
                                    setOpenAdmission(true);
                                }}
                            >
                                <p className="font-semibold">{a.name}</p>
                                <p className="text-sm text-gray-400">{a.whatsappNumber}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ================= CONTACTS ================= */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Contacts</h2>
                    <div className="grid md:grid-cols-2 gap-1">
                        {allContacts.map((c) => (
                            <motion.div
                                key={c._id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white/5 rounded-xl p-4 cursor-pointer"
                                onClick={() => {
                                    setSelectedContact(c);
                                    setOpenContact(true);
                                }}
                            >
                                <p className="font-semibold">{c.name}</p>
                                <p className="text-sm text-gray-400">{c.email}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ================= REVIEWS ================= */}
                <section className="pb-20">
                    <h2 className="text-2xl font-bold mb-4">Course Reviews</h2>
                    <div className="space-y-2">
                        {Object.values(reviewsByCourse).map(({ course, reviews }) => (
                            <motion.div
                                key={course._id}
                                className="bg-white/5 rounded-2xl p-3 border border-white/10"
                            >
                                <h3 className="text-xl font-semibold mb-4 text-pink-400">{course.title}</h3>
                                <div className="space-y-2">
                                    {reviews.map((r) => (
                                        <div className="bg-black/30 rounded-lg p-4 flex gap-2" key={r._id}>
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden select-none">
                                                <Image
                                                    src={r.user?.image || 'https://res.cloudinary.com/dkbz23qyt/image/upload/v1759525517/Avatar_k3tkyn.png'}
                                                    alt="user"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center items-start">
                                                <p className="text-sky-300 italic text-sm mb-1">— {r.user?.username || "Anonymous User"}</p>
                                                <p className="text-sm text-gray-300">{r.comment}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </div>

            {/* ================= MODALS ================= */}
            <DetailModal
                open={openAdmission}
                onClose={() => setOpenAdmission(false)}
                title="Admission Details"
                data={selectedAdmission}
            />

            <DetailModal
                open={openContact}
                onClose={() => setOpenContact(false)}
                title="Contact Details"
                data={selectedContact}
            />

        </div>
    );
}

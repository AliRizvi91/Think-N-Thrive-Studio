"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../reduxComponents/ReduxHook";
import {
    getAllFaqs,
    postFaq,
    updateFaq,
    deleteFaq,
} from "@/react_redux/thunks/FaqThunks";
import { IFaq } from "@/react_redux/thunks/FaqThunks";
import { MdEdit, MdDelete, MdSave } from "react-icons/md";
import MainButton from "../pocket/MainButton";

export default function FaqManager() {
    const dispatch = useAppDispatch();
    const { allFaqs } = useAppSelector((state) => state.StoreOfFaqs); // assuming StoreOfFaq
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [editingFaq, setEditingFaq] = useState<IFaq | null>(null);
    const [search, setSearch] = useState("");
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    // 🔹 Load all FAQs
    useEffect(() => {
        dispatch(getAllFaqs());
    }, [dispatch]);

    // 🔹 Filter FAQs
    const filteredFaqs = useMemo(
        () =>
            allFaqs.filter(
                (f) =>
                    f.question.toLowerCase().includes(search.toLowerCase()) ||
                    f.answer.toLowerCase().includes(search.toLowerCase())
            ),
        [allFaqs, search]
    );

    // 🔹 Handle Create / Update
    const handleSubmit = () => {
        if (!question.trim() || !answer.trim()) return;
        if (editingFaq) {
            dispatch(
                updateFaq({ id: editingFaq._id, data: { question, answer } })
            );
        } else {
            dispatch(postFaq({ question, answer }));
        }
        setQuestion("");
        setAnswer("");
        setEditingFaq(null);
    };

    // 🔹 Handle Edit
    const handleEdit = (faq: IFaq) => {
        setEditingFaq(faq);
        setQuestion(faq.question);
        setAnswer(faq.answer);
    };

    // 🔹 Handle Delete with confirmation
    const handleDelete = (id: string) => {
        setConfirmDeleteId(id);
    };

    const confirmDelete = () => {
        if (confirmDeleteId) {
            dispatch(deleteFaq(confirmDeleteId));
            setConfirmDeleteId(null);
        }
    };

    const cancelDelete = () => setConfirmDeleteId(null);

    return (
        <div className="min-h-screen p-6 bg-[#1c1c1c] text-white pt-35">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* ================= CREATE / EDIT FAQ FORM ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-md rounded-2xl p-6 space-y-1"
                >
                    <h2 className="text-xl font-bold pb-3">
                        {editingFaq ? "Edit FAQ" : "Create FAQ"}
                    </h2>
                    <input
                        type="text"
                        placeholder="Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full p-3 rounded-lg bg-black/30 text-white focus:outline-none"
                    />
                    <textarea
                        placeholder="Answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full p-3 rounded-lg bg-black/30 text-white focus:outline-none"
                    />
                    <MainButton onClick={handleSubmit}>
                        {!editingFaq ? "Add Faqs" : "Submit"}
                    </MainButton>
                </motion.div>

                {/* ================= SEARCH BAR ================= */}
                <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-6 py-3 rounded-full bg-white/10 focus:bg-white/15 text-white focus:outline-none"
                />


                {/* ================= FAQ LIST ================= */}
                <div className="space-y-2 pt-10">
                    <AnimatePresence>
                        {filteredFaqs.map((faq) => (
                            <motion.div
                                key={faq._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white/5 p-4 rounded-sm flex justify-between items-start"
                            >
                                <div className="space-y-1">
                                    <p className="font-semibold">{faq.question}</p>
                                    <p className="text-gray-400">{faq.answer}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(faq)}
                                        className="p-2 bg-sky-400 rounded-full hover:bg-sky-600 cursor-pointer"
                                    >
                                        <MdEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(faq._id)}
                                        className="p-2 bg-red-500 rounded-full hover:bg-red-600 cursor-pointer"
                                    >
                                        <MdDelete size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredFaqs.length === 0 && (
                        <p className="text-center text-gray-400">No FAQs found</p>
                    )}
                </div>
            </div>

            {/* ================= DELETE CONFIRM MODAL ================= */}
            <AnimatePresence>
                {confirmDeleteId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-[#1c1c1c] p-6 rounded-2xl space-y-4 w-80"
                        >
                            <p className="text-center text-white">
                                Are you sure you want to delete this FAQ?
                            </p>
                            <div className="flex justify-between">
                                <button
                                    onClick={cancelDelete}
                                    className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 cursor-pointer"
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

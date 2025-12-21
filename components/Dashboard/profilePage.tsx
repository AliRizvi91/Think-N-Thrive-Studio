"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { getAllUsers  } from "@/react_redux/thunks/UserThunks";
import SearchBar from "@/components/pocket/SearchBar";
import { CiUser } from "react-icons/ci";
import { IoMailUnreadOutline } from "react-icons/io5";
import { MdEdit, MdDelete, MdSave } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../reduxComponents/ReduxHook";
import BorderedAvatar from "../pocket/BorderedAvatar";
import EditUser from "../pocket/EditUser";


export default function profilePage() {
    const dispatch = useAppDispatch();
    const { user, AllUsers } = useAppSelector((state) => state.StoreOfUser);

    const [search, setSearch] = useState("");

    // 🔹 Load data
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);


    // 🔍 Search filter
    const filteredUsers = useMemo(() => {
        return AllUsers.filter((u) =>
            u.email?.toLowerCase().includes(search.toLowerCase()) ||
            u.username?.toLowerCase().includes(search.toLowerCase())
        );
    }, [AllUsers, search]);


    return (
        <div className="min-h-screen p-6 bg-[#1c1c1c] text-white pt-40">
            <div className="max-w-6xl mx-auto space-y-10 flex flex-col justify-center items-center">

                {/* ================= ADMIN PROFILE ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-md rounded-2xl p-6 max-w-md w-[60vw]"
                >
                    <EditUser userId={user?._id ?? ""} />


                </motion.div>

                {/* ================= SEARCH BAR ================= */}
                <SearchBar onSearch={setSearch} />

                {/* ================= USERS LIST ================= */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/5 rounded-2xl p-6 w-[60vw]"
                >
                    <h2 className="text-xl font-bold mb-4">All Users</h2>

                    <div className="flex flex-wrap gap-1">
                        {filteredUsers.map((u) => (
                            <div
                                key={u._id}
                                className="flex justify-between items-center bg-black/30 p-4 rounded-lg w-fit"
                            >
                                <div className="flex justify-center items-center gap-2">
                            <BorderedAvatar
                                          src={
                                            u.image ||
                                            'https://res.cloudinary.com/dkbz23qyt/image/upload/v1759525517/Avatar_k3tkyn.png'
                                          }
                                          alt="Avatar"
                                        />
                                <div>
                                    <p className="font-semibold">{u.username}</p>
                                    <p className="text-sm text-gray-400">{u.email}</p>
                                </div>
                            </div>
                            </div>
                        ))}

                        {filteredUsers.length === 0 && (
                            <p className="text-center text-gray-400">No users found</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

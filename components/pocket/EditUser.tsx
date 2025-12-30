"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../reduxComponents/ReduxHook";
import { updateUserThunk } from "@/react_redux/thunks/UserThunks";
import { MdSave } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { IoMailUnreadOutline } from "react-icons/io5";
import ImageUploader from "./ImageUploader";
import Avatar from "./ProfileButton";
import CustomSelect, { Option } from "./CustomSelect";
import { toast } from "sonner";

interface EditUserProps {
  userId: string;
}

export default function EditUser({ userId }: EditUserProps) {
  const dispatch = useAppDispatch();
  const { AllUsers } = useAppSelector((state) => state.StoreOfUser);

  // 🔍 Find user
  const user = AllUsers.find((u) => u._id === userId);

  // 🧾 Form State
const [formData, setFormData] = useState({
  username: "",
  email: "",
  password: "",
  role: "user",
  image: "", // ✅ sirf string URL
});

const [newImage, setNewImage] = useState<File | null>(null); // ✅ file yahan
const [previewImage, setPreviewImage] = useState<string | null>(null);



  // ⏳ Load user data
useEffect(() => {
  if (user) {
    setFormData({
      username: user.username ?? "",
      email: user.email ?? "",
      password: "",
      role: user.role ?? "user",
      image: user.image ?? "", // ✅ existing image URL
    });
    setNewImage(null);
  }
}, [user]);


  // 💾 Submit
const handleSubmit = async () => {
  try {
    const form = new FormData();

    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("role", formData.role);

    if (formData.password) {
      form.append("password", formData.password);
    }

    // ✅ image sirf tab add hogi jab new select hui ho
    if (newImage) {
      form.append("image", newImage);
    }

    
    await dispatch(updateUserThunk({ id: userId, data: form }));
    toast.success("User updated successfully");
  } catch (err) {
    toast.error("Failed to update user");
  }
};



  // 🔽 Role options
  const RoleOptions: Option[] = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];

  return (
    <div className="bg-white/5 p-6 rounded space-y-4 w-full max-w-md">
      
      {/* 🖼️ Image */}
{/* 🖼️ User Image with Hover Upload */}
<div className="flex justify-center my-4">
  <div className="relative group w-28 h-28 rounded-full overflow-hidden cursor-pointer">

    {/* 👤 Image Priority:
        1️⃣ New selected image
        2️⃣ Existing user image
        3️⃣ Avatar fallback
    */}
    {previewImage ? (
      <img
        src={previewImage}
        alt="Preview"
        className="w-full h-full object-cover rounded-full"
      />
    ) : formData.image ? (
      <img
        src={formData.image}
        alt="User"
        className="w-full h-full object-cover rounded-full"
      />
    ) : (
      <Avatar />
    )}

    {/* 🖼️ Hover Uploader */}
    <div
      className="
        absolute inset-0 
        bg-black/60 
        flex items-center justify-center
        opacity-0 scale-95
        group-hover:opacity-100 group-hover:scale-100
        transition-all duration-300 ease-in-out
      "
    >
      <ImageUploader
        defaultImage={formData.image}
        onImageSelect={(file) => {
          setNewImage(file);
          setPreviewImage(URL.createObjectURL(file));
        }}
      />
    </div>
  </div>
</div>



      {/* 👤 Username */}
      <div className="relative">
        <CiUser className="absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          placeholder="Username"
          className="pl-10 p-2 rounded w-full bg-black/20 outline-none"
        />
      </div>

      {/* 📧 Email */}
      <div className="relative">
        <IoMailUnreadOutline className="absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          placeholder="Email"
          className="pl-10 p-2 rounded w-full bg-black/20 outline-none"
        />
      </div>

      {/* 🔐 Password */}
      <input
        type="password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
        placeholder="Password (leave blank to keep)"
        className="p-2 rounded w-full bg-black/20 outline-none"
      />

      {/* 🎭 Role */}
      <CustomSelect
        options={RoleOptions}
        placeholder="Select Role"
        value={formData.role}
        onChange={(value) =>
          setFormData({ ...formData, role: value })
        }
      />

      {/* 💾 Save */}
      <button
        onClick={handleSubmit}
        className="bg-pink-600 text-white py-2 px-4 rounded flex items-center gap-2 cursor-pointer"
      >
        <MdSave /> Save Changes
      </button>
    </div>
  );
}

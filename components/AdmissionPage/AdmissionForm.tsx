"use client";

import React, { useEffect, useState, FormEvent } from "react";
import Container from "../pocket/Container";
import MainButton from "../pocket/MainButton";
import CustomSelect, { Option } from "../pocket/CustomSelect";
import { useAppDispatch, useAppSelector } from "../reduxComponents/ReduxHook";
import { postAdmission } from "@/react_redux/thunks/AdmissionThunks";
import { ICourse, getAllCourses } from "@/react_redux/thunks/CourseThunks";

function AdmissionForm() {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.StoreOfAdmission);
    const { allCourses } = useAppSelector(
        (state) => state.StoreOfCourse
    ) as { allCourses: ICourse[] };

    const [formData, setFormData] = useState({
        name: "",
        whatsappNumber: "",
        educationLevel: "",
        age: "",
        referralSource: "",
        selectedCourse: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);

    const courseOptions: Option[] = allCourses.map((course) => ({
        value: course._id,
        label: course.title,
    }));

    const referralOptions: Option[] = [
        { value: "Instagram", label: "Instagram" },
        { value: "Facebook", label: "Facebook" },
        { value: "Friends", label: "Friends / Classmate" },
        { value: "Website", label: "Website" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        const isAnyFieldEmpty = Object.values(formData).some(
            (value) => value.trim() === ""
        );

        if (isAnyFieldEmpty) {
            setError("Please fill all fields");
            return;
        }

        const result = await dispatch(
            postAdmission({
                name: formData.name,
                whatsappNumber: formData.whatsappNumber,
                educationLevel: formData.educationLevel,
                age: formData.age,
                referralSource: formData.referralSource,
                selectedCourses: [formData.selectedCourse],
            })
        );

        if (postAdmission.fulfilled.match(result)) {
            setSuccess(true);
            setFormData({
                name: "",
                whatsappNumber: "",
                educationLevel: "",
                age: "",
                referralSource: "",
                selectedCourse: "",
            });
        }
    };


    return (
        <Container maxWidth="Exl" className="pt-32 min-h-screen">
            <div className="grid md:grid-cols-2 gap-10 relative md:top-[30vh] top-[13vh] ">
                <div className="flex justify-center items-center select-none">
                    <object
                        data="/assets/images/Admission.svg"
                        type="image/svg+xml"
                        className="w-[60%]"
                    />
                </div>

                <form
                    className="flex flex-col gap-4 px-5 md:px-20"
                >
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="border-b py-2 outline-none"
                    />

                    <input
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        placeholder="WhatsApp Number"
                        className="border-b py-2 outline-none"
                    />

                    <input
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleChange}
                        placeholder="Education Level"
                        className="border-b py-2 outline-none"
                    />

                    <input
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        className="border-b py-2 outline-none"
                    />

                    <div className="flex flex-col justify-center items-center gap-1">
                        <CustomSelect
                            options={courseOptions}
                            placeholder="Select Course"
                            value={formData.selectedCourse}   // ✅ add this
                            onChange={(value) =>
                                setFormData({ ...formData, selectedCourse: value })
                            }
                        />

                        <CustomSelect
                            options={referralOptions}
                            placeholder="How did you hear about us?"
                            value={formData.referralSource}    // ✅ add this
                            onChange={(value) =>
                                setFormData({ ...formData, referralSource: value })
                            }
                        />

                    </div>

                    {error && <p className="text-red-500">{error}</p>}
                    {success && (
                        <p className="text-green-500">Admission submitted successfully ✔</p>
                    )}

                    <MainButton onClick={handleSubmit} disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </MainButton>
                </form>
            </div>
        </Container>
    );
}

export default AdmissionForm;

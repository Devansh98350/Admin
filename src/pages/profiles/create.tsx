"use client"; // Ensure the component is treated as a client component

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProfile } from "../../redux/slices/profileSlice";
import { useRouter } from "next/navigation"; // Use the correct import for `useRouter` in Next.js app directory
import ProfileForm from "../../components/forms/ProfileForm";
import Layout from "../../components/Layout";

const CreateProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [profile, setProfile] = useState({
    student_name: "",
    school_name: "",
    age: "",
    board_id: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createProfile(profile))
      .unwrap()
      .then(() => {
        router.push("/profiles");
      })
      .catch((error) => setErrors(error));
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Profile
        </h1>
        <ProfileForm
          profile={profile}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </Layout>
  );
};

export default CreateProfilePage;

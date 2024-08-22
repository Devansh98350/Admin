"use client"; // Ensure the component is treated as a client component

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/slices/userSlice";
import { useRouter } from "next/navigation"; // Use the correct import for `useRouter` in Next.js app directory
import UserForm from "../../components/forms/UserForm";
import Layout from "../../components/Layout";

const CreateUserPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUser(user))
      .unwrap()
      .then(() => {
        router.push("/users");
      })
      .catch((error) => setErrors(error));
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create User
        </h1>
        <UserForm
          user={user}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </Layout>
  );
};

export default CreateUserPage;

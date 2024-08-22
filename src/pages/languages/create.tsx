"use client"; // Ensure the component is treated as a client component

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createLanguage } from "../../redux/slices/languageSlice";
import { useRouter } from "next/navigation"; // Correct import for Next.js app directory
import LanguageForm from "../../components/forms/LanguageForm";
import Layout from "../../components/Layout";

const CreateLanguagePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [language, setLanguage] = useState({ name: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLanguage({ ...language, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createLanguage(language))
      .unwrap()
      .then(() => {
        router.push("/languages");
      })
      .catch((error) => setErrors(error));
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create New Language
        </h1>
        <LanguageForm
          language={language}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </Layout>
  );
};

export default CreateLanguagePage;

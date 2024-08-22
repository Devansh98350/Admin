"use client"; // Ensure the component is treated as a client component

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCertificate } from "../../redux/slices/certificateSlice";
import { useRouter } from "next/navigation"; // Use the correct import for `useRouter` in Next.js app directory
import CertificateForm from "../../components/forms/CertificateForm";
import Layout from "../../components/Layout";
import { AppDispatch } from "../../redux/store"; // Make sure this is correctly imported

const CreateCertificatePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [certificate, setCertificate] = useState<{
    name: string;
    description: string;
  }>({ name: "", description: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCertificate({ ...certificate, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createCertificate(certificate))
      .unwrap()
      .then(() => {
        router.push("/certificates");
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setErrors({ general: error.message });
        } else {
          setErrors({ general: "An unknown error occurred." });
        }
      });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Certificate
        </h1>
        <CertificateForm
          certificate={certificate}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </Layout>
  );
};

export default CreateCertificatePage;

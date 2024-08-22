"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCertificate } from "../../redux/slices/certificateSlice";
import { useRouter } from "next/navigation";
import CertificateForm from "../../components/forms/CertificateForm";
import Layout from "../../components/Layout";

interface Certificate {
  name: string;
  description: string;
}

interface Errors {
  message?: string;
}

const CreateCertificatePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [certificate, setCertificate] = useState<Certificate>({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCertificate({ ...certificate, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createCertificate(certificate)).unwrap();
      router.push("/certificates");
    } catch (error) {
      // Handle the error by asserting its type and extracting the message
      const errorMessage =
        (error as { message?: string })?.message || "An error occurred";
      setErrors({ message: errorMessage });
    }
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

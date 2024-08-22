"use client"; // Ensure the component is treated as a client component

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCountry } from "../../redux/slices/countrySlice";
import { useRouter } from "next/navigation"; // Use the correct import for `useRouter` in Next.js app directory
import CountryForm from "../../components/forms/CountryForm";
import Layout from "../../components/Layout";

const CreateCountryPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [country, setCountry] = useState({ name: "", code: "" }); // Added code field
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCountry({ ...country, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createCountry(country))
      .unwrap()
      .then(() => {
        router.push("/countries");
      })
      .catch((error) => setErrors(error));
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Country
        </h1>
        <CountryForm
          country={country}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </Layout>
  );
};

export default CreateCountryPage;

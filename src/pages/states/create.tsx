"use client"; // Ensure the component is treated as a client component

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createState } from "../../redux/slices/stateSlice";
import { useRouter } from "next/navigation"; // Use the correct import for `useRouter` in Next.js app directory
import StateForm from "../../components/forms/StateForm";
import Layout from "../../components/Layout";

const CreateStatePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [state, setState] = useState({
    country_code: "",
    state_name: "",
    state_code: "",
  }); // Updated state
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createState(state))
      .unwrap()
      .then(() => {
        router.push("/states");
      })
      .catch((error) => setErrors(error));
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create New State
        </h1>
        <StateForm
          state={state}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </Layout>
  );
};

export default CreateStatePage;

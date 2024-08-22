"use client"; // Ensure the component is treated as a client component

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTopicProgress } from "../../redux/slices/topicProgressSlice";
import { useRouter } from "next/navigation"; // Use the correct import for `useRouter` in Next.js app directory
import Layout from "../../components/Layout";
import TopicProgressForm from "../../components/forms/TopicProgressForm";

const CreateTopicProgressPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [progress, setProgress] = useState({
    topic_id: "",
    user_id: "",
    progress: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProgress({ ...progress, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createTopicProgress(progress))
      .unwrap()
      .then(() => {
        router.push("/topic_progress");
      })
      .catch((error) => setErrors(error));
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Topic Progress
        </h1>
        <TopicProgressForm
          progress={progress}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </Layout>
  );
};

export default CreateTopicProgressPage;

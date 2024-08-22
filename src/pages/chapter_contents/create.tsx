"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChapterContent } from "../../redux/slices/chapterContentSlice";
import { fetchChapters } from "../../redux/slices/chapterSlice";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { AppDispatch, RootState } from "../../redux/store";

const CreateChapterContentPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [content, setContent] = useState({
    chapter_code: "",
    topic: "",
    sub_topic: "",
    sub_sub_topic: "",
    descriptive_content: "",
    image_list: "",
    voice_generation_json: "",
    paragraph_number: 0, // Added paragraph_number field
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const chapters = useSelector((state: RootState) => state.chapter.chapters);

  useEffect(() => {
    dispatch(fetchChapters());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createChapterContent({ ...content })).unwrap();
      router.push("/chapter_contents");
    } catch (error) {
      setErrors(error as Record<string, string>);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Chapter Content
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Chapter Code
            </label>
            <select
              name="chapter_code"
              value={content.chapter_code}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Chapter Code</option>
              {chapters.map((chapter) => (
                <option key={chapter.chapter_code} value={chapter.chapter_code}>
                  {chapter.chapter_code}
                </option>
              ))}
            </select>
            {errors.chapter_code && (
              <p className="text-red-500 text-xs mt-1">{errors.chapter_code}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Topic
            </label>
            <input
              type="text"
              name="topic"
              value={content.topic}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter topic"
            />
            {errors.topic && (
              <p className="text-red-500 text-xs mt-1">{errors.topic}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sub Topic
            </label>
            <input
              type="text"
              name="sub_topic"
              value={content.sub_topic}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter sub topic"
            />
            {errors.sub_topic && (
              <p className="text-red-500 text-xs mt-1">{errors.sub_topic}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sub Sub Topic
            </label>
            <input
              type="text"
              name="sub_sub_topic"
              value={content.sub_sub_topic}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter sub sub topic"
            />
            {errors.sub_sub_topic && (
              <p className="text-red-500 text-xs mt-1">
                {errors.sub_sub_topic}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Descriptive Content
            </label>
            <textarea
              name="descriptive_content"
              value={content.descriptive_content}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter descriptive content"
              rows={4}
            />
            {errors.descriptive_content && (
              <p className="text-red-500 text-xs mt-1">
                {errors.descriptive_content}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image List (comma separated)
            </label>
            <input
              type="text"
              name="image_list"
              value={content.image_list}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter image list"
            />
            {errors.image_list && (
              <p className="text-red-500 text-xs mt-1">{errors.image_list}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Voice Generation JSON
            </label>
            <textarea
              name="voice_generation_json"
              value={content.voice_generation_json}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter voice generation JSON"
              rows={4}
            />
            {errors.voice_generation_json && (
              <p className="text-red-500 text-xs mt-1">
                {errors.voice_generation_json}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Paragraph Number
            </label>
            <input
              type="number"
              name="paragraph_number"
              value={content.paragraph_number}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter paragraph number"
            />
            {errors.paragraph_number && (
              <p className="text-red-500 text-xs mt-1">
                {errors.paragraph_number}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateChapterContentPage;

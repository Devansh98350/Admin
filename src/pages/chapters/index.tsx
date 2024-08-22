"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChapters } from "../../redux/slices/chapterSlice";
import Link from "next/link";
import Layout from "../../components/Layout";
import { AppDispatch } from "../../redux/store"; // Import AppDispatch

const ChaptersPage = () => {
  const dispatch: AppDispatch = useDispatch(); // Type dispatch with AppDispatch

  // Use a safer way to select chapters
  const chapters = useSelector((state: any) => state.chapter.chapters || []);
  const loading = useSelector((state: any) => state.chapter.loading);
  const error = useSelector((state: any) => state.chapter.error);

  useEffect(() => {
    dispatch(fetchChapters()); // Ensure dispatch knows about the async thunk
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Chapters</h1>
      <Link href="/chapters/create" passHref>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Create New Chapter
        </span>
      </Link>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">
                Chapter Code
              </th>
              <th className="py-2 px-4 text-left text-gray-600">
                Subject Code
              </th>
              <th className="py-2 px-4 text-left text-gray-600">Class Code</th>
              <th className="py-2 px-4 text-left text-gray-600">
                Chapter Name
              </th>
              <th className="py-2 px-4 text-left text-gray-600">Board Code</th>
              <th className="py-2 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(chapters) && chapters.length > 0 ? (
              chapters.map(
                (chapter: {
                  chapter_code: string;
                  subject_code: string;
                  class_code: string;
                  chapter_name: string;
                  board_code: string;
                  id: number;
                }) => (
                  <tr
                    key={chapter.id}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="py-2 px-4 text-gray-800">
                      {chapter.chapter_code}
                    </td>
                    <td className="py-2 px-4 text-gray-800">
                      {chapter.subject_code}
                    </td>
                    <td className="py-2 px-4 text-gray-800">
                      {chapter.class_code}
                    </td>
                    <td className="py-2 px-4 text-gray-800">
                      {chapter.chapter_name}
                    </td>
                    <td className="py-2 px-4 text-gray-800">
                      {chapter.board_code}
                    </td>
                    <td className="py-2 px-4">
                      <Link
                        // href={`/chapters/${chapter.id}`}
                        href={``}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-600">
                  No chapters available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ChaptersPage;

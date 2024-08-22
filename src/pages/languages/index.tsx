"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLanguages } from "../../redux/slices/languageSlice";
import Link from "next/link";
import Layout from "../../components/Layout";

const LanguagesPage = () => {
  const dispatch = useDispatch();

  // Select languages from the Redux store
  const languages = useSelector((state: any) => state.language.languages || []);
  const loading = useSelector((state: any) => state.language.loading);
  const error = useSelector((state: any) => state.language.error);

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Languages</h1>
      <Link href="/languages/create" passHref>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Create New Language
        </span>
      </Link>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">
                Language Name
              </th>
              <th className="py-2 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(languages) && languages.length > 0 ? (
              languages.map(
                (language: { id: number; language_name: string }) => (
                  <tr
                    key={language.id}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="py-2 px-4 text-gray-800">
                      {language.language_name}
                    </td>
                    <td className="py-2 px-4">
                      <Link
                        // href={`/languages/${language.id}`}
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
                <td colSpan={2} className="py-4 text-center text-gray-600">
                  No languages available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default LanguagesPage;

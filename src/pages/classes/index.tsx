"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClasses } from "../../redux/slices/classSlice";
import Link from "next/link";
import Layout from "../../components/Layout";

const ClassesPage = () => {
  const dispatch = useDispatch();

  // Use a safer way to select classes
  const classes = useSelector((state: any) => state.class.classes || []);
  const loading = useSelector((state: any) => state.class.loading);
  const error = useSelector((state: any) => state.class.error);

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Classes</h1>
      <Link href="/classes/create" passHref>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Create New Class
        </span>
      </Link>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">Class Code</th>
              <th className="py-2 px-4 text-left text-gray-600">Class Name</th>
              <th className="py-2 px-4 text-left text-gray-600">Board Code</th>
              <th className="py-2 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(classes) && classes.length > 0 ? (
              classes.map(
                (cls: {
                  class_code: string;
                  class_name: string;
                  board_code: string;
                  id: number;
                }) => (
                  <tr
                    key={cls.id}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="py-2 px-4 text-gray-800">
                      {cls.class_code}
                    </td>
                    <td className="py-2 px-4 text-gray-800">
                      {cls.class_name}
                    </td>
                    <td className="py-2 px-4 text-gray-800">
                      {cls.board_code}
                    </td>
                    <td className="py-2 px-4">
                      <Link
                        href={`/classes/${cls.id}`}
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
                <td colSpan={4} className="py-4 text-center text-gray-600">
                  No classes available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ClassesPage;

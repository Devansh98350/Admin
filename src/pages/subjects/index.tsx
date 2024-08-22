"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubjects } from "../../redux/slices/subjectSlice";
import { fetchClasses } from "../../redux/slices/classSlice";
import { fetchBoards } from "../../redux/slices/boardSlice";
import Link from "next/link";
import Layout from "../../components/Layout";

const SubjectsPage = () => {
  const dispatch = useDispatch();

  // Use a safer way to select subjects, classes, and boards
  const subjects = useSelector((state: any) => state.subject.subjects || []);
  const classes = useSelector((state: any) => state.class.classes || []);
  const boards = useSelector((state: any) => state.board.boards || []);
  const loading = useSelector((state: any) => state.subject.loading);
  const error = useSelector((state: any) => state.subject.error);

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchClasses());
    dispatch(fetchBoards());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  // Create a mapping for class codes and board names
  const classMap = new Map(
    classes.map((cls: { class_code: string }) => [
      cls.class_code,
      cls.class_code,
    ])
  );
  const boardMap = new Map(
    boards.map((board: { board_code: string; board_code: string }) => [
      board.board_code,
      board.board_code,
    ])
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Subjects</h1>
      <Link href="/subjects/create" passHref>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Create New Subject
        </span>
      </Link>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">
                Subject Code
              </th>
              <th className="py-2 px-4 text-left text-gray-600">
                Subject Name
              </th>
              <th className="py-2 px-4 text-left text-gray-600">Class Code</th>
              <th className="py-2 px-4 text-left text-gray-600">Board Name</th>
              <th className="py-2 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(subjects) && subjects.length > 0 ? (
              subjects.map(
                (subject: {
                  subject_code: string;
                  subject_name: string;
                  class_code: string;
                  board_code: string;
                  id: number;
                }) => (
                  <tr
                    key={subject.id}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="py-2 px-4 text-gray-800">
                      {subject.subject_code}
                    </td>
                    <td className="py-2 px-4 text-gray-800">
                      {subject.subject_name}
                    </td>
                    <td className="py-2 px-4 text-gray-800">
                      {classMap.get(subject.class_code) || "Unknown"}
                    </td>
                    <td className="py-2 px-4 text-gray-800">
                      {boardMap.get(subject.board_code) || "Unknown"}
                    </td>
                    <td className="py-2 px-4">
                      <Link
                        // href={`/subjects/${subject.id}`}
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
                <td colSpan={5} className="py-4 text-center text-gray-600">
                  No subjects available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default SubjectsPage;

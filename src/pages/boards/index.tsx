"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoards } from "../../redux/slices/boardSlice";
import Link from "next/link";
import Layout from "../../components/Layout";

const BoardsPage = () => {
  const dispatch = useDispatch();

  // Select boards from the Redux store
  const boards = useSelector((state: any) => state.board.boards || []);
  const loading = useSelector((state: any) => state.board.loading);
  const error = useSelector((state: any) => state.board.error);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Boards</h1>
      <Link href="/boards/create" passHref>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Create New Board
        </span>
      </Link>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">Board Name</th>
              <th className="py-2 px-4 text-left text-gray-600">
                Country Code
              </th>
              <th className="py-2 px-4 text-left text-gray-600">State</th>
              <th className="py-2 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(boards) && boards.length > 0 ? (
              boards.map(
                (board: {
                  board_code: string;
                  country_code: string;
                  state: string;
                  id: number;
                }) => (
                  <tr
                    key={board.id}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="py-2 px-4 text-gray-800">
                      {board.board_code}
                    </td>
                    <td className="py-2 px-4 text-gray-800">
                      {board.country_code}
                    </td>
                    <td className="py-2 px-4 text-gray-800">{board.state}</td>
                    <td className="py-2 px-4">
                      <Link
                        // href={`/boards/${board.id}`}
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
                <td colSpan={4} className="py-4 text-center text-gray-600">
                  No boards available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default BoardsPage;

"use client"; // Ensure the component is treated as a client component

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createClass } from "../../redux/slices/classSlice";
import { fetchBoards } from "../../redux/slices/boardSlice";
import Layout from "../../components/Layout";
import { RootState } from "../../redux/store"; // Adjust this import based on your store configuration

const CreateClassPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [cls, setCls] = useState({
    class_code: "",
    class_name: "",
    board_code: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Fetch boards from boardSlice
  const boards = useSelector((state: RootState) => state.board.boards || []);
  const loading = useSelector((state: RootState) => state.board.loading);
  const error = useSelector((state: RootState) => state.board.error);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCls({ ...cls, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createClass(cls))
      .unwrap()
      .then(() => {
        router.push("/classes");
      })
      .catch((error) => {
        const parsedErrors = error.response?.data?.errors || {
          general: "An error occurred",
        };
        setErrors(parsedErrors);
      });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Class
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="class_code"
            >
              Class Code
            </label>
            <input
              id="class_code"
              name="class_code"
              type="text"
              value={cls.class_code}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter class code"
            />
            {errors.class_code && (
              <p className="text-red-500 text-xs mt-1">{errors.class_code}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="class_name"
            >
              Class Name
            </label>
            <input
              id="class_name"
              name="class_name"
              type="text"
              value={cls.class_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter class name"
            />
            {errors.class_name && (
              <p className="text-red-500 text-xs mt-1">{errors.class_name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="board_code"
            >
              Board Name
            </label>
            <select
              id="board_code"
              name="board_code"
              value={cls.board_code}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Board Name</option>
              {loading ? (
                <option>Loading...</option>
              ) : error ? (
                <option>Error loading boards</option>
              ) : (
                boards.map(
                  (board: { board_code: string; board_name: string }) => (
                    <option key={board.board_code} value={board.board_code}>
                      {board.board_code}
                    </option>
                  )
                )
              )}
            </select>
            {errors.board_code && (
              <p className="text-red-500 text-xs mt-1">{errors.board_code}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Class"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateClassPage;

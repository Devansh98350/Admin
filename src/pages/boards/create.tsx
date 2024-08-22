"use client"; // Ensure the component is treated as a client component

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createBoard } from "../../redux/slices/boardSlice";
import { fetchCountries } from "../../redux/slices/countrySlice";
import Layout from "../../components/Layout";

const CreateBoardPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [board, setBoard] = useState({
    board_code: "",
    country_code: "",
    state: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch countries from countrySlice
  const countries = useSelector((state: any) => state.country.countries || []);
  const loading = useSelector((state: any) => state.country.loading);
  const error = useSelector((state: any) => state.country.error);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Assuming you have validation logic here
    dispatch(createBoard(board))
      .unwrap()
      .then(() => {
        router.push("/boards");
      })
      .catch((error) => setErrors(error));
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create New Board
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Board Name
            </label>
            <input
              type="text"
              value={board.board_code}
              onChange={(e) =>
                setBoard({ ...board, board_code: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter board name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country Code
            </label>
            <select
              value={board.country_code}
              onChange={(e) =>
                setBoard({ ...board, country_code: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Country Code</option>
              {loading ? (
                <option>Loading...</option>
              ) : error ? (
                <option>Error loading countries</option>
              ) : (
                countries.map(
                  (country: { country_code: string; country_name: string }) => (
                    <option
                      key={country.country_code}
                      value={country.country_code}
                    >
                      {country.country_name} ({country.country_code})
                    </option>
                  )
                )
              )}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              State
            </label>
            <input
              type="text"
              value={board.state}
              onChange={(e) => setBoard({ ...board, state: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter state"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Board
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateBoardPage;

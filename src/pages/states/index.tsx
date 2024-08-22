import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStates } from "../../redux/slices/stateSlice";
import Link from "next/link";
import Layout from "../../components/Layout";

const StatesPage = () => {
  const dispatch = useDispatch();

  // Safely select states, loading, and error from Redux state
  const states = useSelector((state: any) => state.state.states || []);
  const loading = useSelector((state: any) => state.state.loading);
  const error = useSelector((state: any) => state.state.error);

  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">Error fetching states: {error}</p>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">States</h1>
      <Link href="/states/create" passHref>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Create New State
        </span>
      </Link>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">State Name</th>
              <th className="py-2 px-4 text-left text-gray-600">State Code</th>
              <th className="py-2 px-4 text-left text-gray-600">
                Country Code
              </th>
              <th className="py-2 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(states) && states.length > 0 ? (
              states.map((state: any) => (
                <tr
                  key={state.id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="py-2 px-4 text-gray-800">
                    {state.state_name}
                  </td>
                  <td className="py-2 px-4 text-gray-800">
                    {state.state_code}
                  </td>
                  <td className="py-2 px-4 text-gray-800">
                    {state.country_code}
                  </td>
                  <td className="py-2 px-4">
                    {/* <Link href={`/states/${state.id}`} passHref> */}
                    <Link href={``} passHref>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-600">
                  No states available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default StatesPage;

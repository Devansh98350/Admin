"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountries } from "../../redux/slices/countrySlice";
import Link from "next/link";
import Layout from "../../components/Layout";

const CountriesPage = () => {
  const dispatch = useDispatch();

  // Select countries from the Redux store
  const countries = useSelector((state: any) => state.country.countries || []);
  const loading = useSelector((state: any) => state.country.loading);
  const error = useSelector((state: any) => state.country.error);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Countries</h1>
      <Link href="/countries/create" passHref>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Create New Country
        </span>
      </Link>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">
                Country Name
              </th>
              <th className="py-2 px-4 text-left text-gray-600">
                Country Code
              </th>
              <th className="py-2 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(countries) && countries.length > 0 ? (
              countries.map(
                (country: {
                  country_name: string;
                  country_code: string;
                  id: number;
                }) => (
                  <tr
                    key={country.id}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="py-2 px-4 text-gray-800">
                      {country.country_name}
                    </td>
                    <td className="py-2 px-4 text-gray-800">
                      {country.country_code}
                    </td>
                    <td className="py-2 px-4">
                      <Link
                        // href={`/countries/${country.id}`}
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
                <td colSpan={3} className="py-4 text-center text-gray-600">
                  No countries available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default CountriesPage;

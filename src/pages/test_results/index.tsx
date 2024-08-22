"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTestResults } from "../../redux/slices/testResultSlice";
import Link from "next/link";
import Layout from "../../components/Layout";

const TestResultsPage = () => {
  const dispatch = useDispatch();

  // Use a safer way to select results
  const results = useSelector((state: any) => state.testResult.results || []);
  const loading = useSelector((state: any) => state.testResult.loading);

  useEffect(() => {
    dispatch(fetchTestResults());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Check if results is an array before mapping
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Test Results</h1>
      <Link href="/test_results/create" passHref>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Create New Test Result
        </span>
      </Link>
      <ul>
        {Array.isArray(results) && results.length > 0 ? (
          results.map((result: any) => (
            <li key={result.id}>
              Score: {result.score} -{" "}
              <Link href={`/test_results/${result.id}`}>Edit</Link>
            </li>
          ))
        ) : (
          <p>No test results available.</p>
        )}
      </ul>
    </Layout>
  );
};

export default TestResultsPage;

"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTests } from "../../redux/slices/testSlice";
import Link from "next/link";
import Layout from "../../components/Layout";

const TestsPage = () => {
  const dispatch = useDispatch();

  // Use a safer way to select tests
  const tests = useSelector((state: any) => state.test.tests || []);
  const loading = useSelector((state: any) => state.test.loading);

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Check if tests is an array before mapping
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Tests</h1>
      <Link href="/tests/create" passHref>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Create New Test
        </span>
      </Link>
      <ul>
        {Array.isArray(tests) && tests.length > 0 ? (
          tests.map((test: any) => (
            <li key={test.id}>
              {test.name} - <Link href={`/tests/${test.id}`}>Edit</Link>
            </li>
          ))
        ) : (
          <p>No tests available.</p>
        )}
      </ul>
    </Layout>
  );
};

export default TestsPage;

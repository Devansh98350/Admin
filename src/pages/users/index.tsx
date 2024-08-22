"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/slices/userSlice";
import Link from "next/link";
import Layout from "../../components/Layout";

const UsersPage = () => {
  const dispatch = useDispatch();

  // Use a safer way to select users
  const users = useSelector((state: any) => state.user.users || []);
  const loading = useSelector((state: any) => state.user.loading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Link href="/users/create" passHref>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Create New User
        </span>
      </Link>
      <ul>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user: any) => (
            <li key={user.id}>
              {user.username} - {user.email} -{" "}
              <Link href={`/users/${user.id}`} passHref>
                <span className="text-blue-500 cursor-pointer hover:underline">
                  Edit
                </span>
              </Link>
            </li>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </ul>
    </Layout>
  );
};

export default UsersPage;

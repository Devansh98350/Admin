"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfiles } from "../../redux/slices/profileSlice";
import Link from "next/link";
import Layout from "../../components/Layout";

const ProfilesPage = () => {
  const dispatch = useDispatch();

  // Use a safer way to select profiles
  const profiles = useSelector((state: any) => state.profile.profiles || []);
  const loading = useSelector((state: any) => state.profile.loading);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Check if profiles is an array before mapping
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Profiles</h1>
      <Link href="/profiles/create" passHref>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Create New Profile
        </span>
      </Link>
      <ul>
        {Array.isArray(profiles) && profiles.length > 0 ? (
          profiles.map((profile: any) => (
            <li key={profile.id}>
              {profile.student_name} - {profile.school_name} -{" "}
              <Link href={`/profiles/${profile.id}`}>Edit</Link>
            </li>
          ))
        ) : (
          <p>No profiles available.</p>
        )}
      </ul>
    </Layout>
  );
};

export default ProfilesPage;

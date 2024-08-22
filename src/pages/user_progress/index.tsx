import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProgresses } from "../../redux/slices/userProgressSlice";
import Link from "next/link";
import Layout from "../../components/Layout";

const UserProgressPage = () => {
  const dispatch = useDispatch();
  const userProgresses = useSelector(
    (state: any) => state.userProgress.userProgresses || []
  );

  const loading = useSelector((state: any) => state.userProgress.loading);

  useEffect(() => {
    dispatch(fetchUserProgresses());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-4">User Progress</h1>
        <Link href="/user_progress/create" passHref>
          <span className="text-blue-500 cursor-pointer hover:underline">
            Create New Progress
          </span>
        </Link>
        <ul>
          {userProgresses.map((userProgress: any) => (
            <li key={userProgress.id}>
              {userProgress.progress} -{" "}
              <Link href={`/user_progress/${progress.id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default UserProgressPage;

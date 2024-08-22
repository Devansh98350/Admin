import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChapterProgresses } from "../../redux/slices/chapterProgressSlice";
import Link from "next/link";
import Layout from "../../components/Layout";

const ChapterProgressPage = () => {
  const dispatch = useDispatch();
  const chapterProgresses = useSelector(
    (state: any) => state.chapterProgress.chapterProgresses || []
  );
  const loading = useSelector((state: any) => state.chapterProgress.loading);

  useEffect(() => {
    dispatch(fetchChapterProgresses());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Chapter Progress</h1>
        <Link href="/chapter_progress/create" passHref>
          <span className="text-blue-500 cursor-pointer hover:underline">
            Create New Chapter Progress
          </span>
        </Link>
        <ul>
          {chapterProgresses.map((progress: any) => (
            <li key={progress.id}>
              {progress.progress} -{" "}
              <Link href={`/chapter_progress/${progress.id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default ChapterProgressPage;

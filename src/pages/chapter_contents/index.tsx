import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChapterContents } from "../../redux/slices/chapterContentSlice";
import Link from "next/link";
import Layout from "../../components/Layout";

const ChapterContentsPage = () => {
  const dispatch = useDispatch();
  const [selectedContent, setSelectedContent] = useState<any>(null);

  const contents = useSelector(
    (state: any) => state.chapterContent.contents || []
  );
  const loading = useSelector((state: any) => state.chapterContent.loading);
  const error = useSelector((state: any) => state.chapterContent.error);

  useEffect(() => {
    dispatch(fetchChapterContents());
  }, [dispatch]);

  const handleView = (content: any) => {
    setSelectedContent(content);
  };

  const closeModal = () => {
    setSelectedContent(null);
  };

  const truncateSingleWord = (text: string) => {
    const words = text.trim().split(" ");
    return words.length === 1 ? `${text}...` : text;
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Chapter Contents</h1>
      <Link href="/chapter_contents/create" passHref>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Create New Content
        </span>
      </Link>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">
                Chapter Code
              </th>
              <th className="py-2 px-4 text-left text-gray-600">Topic</th>
              <th className="py-2 px-4 text-left text-gray-600">Sub Topic</th>
              <th className="py-2 px-4 text-left text-gray-600">
                Sub Sub Topic
              </th>
              <th className="py-2 px-4 text-left text-gray-600">
                Paragraph Number
              </th>
              <th className="py-2 px-4 text-left text-gray-600">
                Descriptive Content
              </th>
              <th className="py-2 px-4 text-left text-gray-600">Image List</th>
              <th className="py-2 px-4 text-left text-gray-600">
                Voice Generation JSON
              </th>
              <th className="py-2 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(contents) && contents.length > 0 ? (
              contents.map((content: any) => (
                <tr
                  key={content.id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="py-2 px-4 text-gray-800">
                    {content.chapter_code}
                  </td>
                  <td className="py-2 px-4 text-gray-800">
                    {truncateSingleWord(content.topic)}
                  </td>
                  <td className="py-2 px-4 text-gray-800">
                    {truncateSingleWord(content.sub_topic)}
                  </td>
                  <td className="py-2 px-4 text-gray-800">
                    {truncateSingleWord(content.sub_sub_topic)}
                  </td>
                  <td className="py-2 px-4 text-gray-800">
                    {content.paragraph_number}
                  </td>
                  <td className="py-2 px-4 text-gray-800">
                    {truncateSingleWord(content.descriptive_content)}
                  </td>
                  <td className="py-2 px-4 text-gray-800">
                    {truncateSingleWord(content.image_list)}
                  </td>
                  <td className="py-2 px-4 text-gray-800">
                    {truncateSingleWord(content.voice_generation_json)}
                  </td>
                  <td className="py-2 px-4 flex items-center space-x-2">
                    <Link
                      // href={`/chapter_contents/${content.id}`}
                      href={``}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleView(content)}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-4 text-center text-gray-600">
                  No chapter contents available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedContent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "60%",
              maxHeight: "80%",
              overflowY: "auto",
            }}
          >
            <h2 className="text-xl font-bold mb-4">Content Details</h2>
            <p>
              <strong>Chapter Code:</strong> {selectedContent.chapter_code}
            </p>
            <p>
              <strong>Topic:</strong> {selectedContent.topic}
            </p>
            <p>
              <strong>Sub Topic:</strong> {selectedContent.sub_topic}
            </p>
            <p>
              <strong>Sub Sub Topic:</strong> {selectedContent.sub_sub_topic}
            </p>
            <p>
              <strong>Paragraph Number:</strong>{" "}
              {selectedContent.paragraph_number}
            </p>
            <p>
              <strong>Descriptive Content:</strong>{" "}
              {selectedContent.descriptive_content}
            </p>
            <p>
              <strong>Image List:</strong> {selectedContent.image_list}
            </p>
            <p>
              <strong>Voice Generation JSON:</strong>{" "}
              {selectedContent.voice_generation_json}
            </p>
            <button
              onClick={closeModal}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#3182ce",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ChapterContentsPage;

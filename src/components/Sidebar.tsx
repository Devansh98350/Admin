import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 bg-gray-100 h-screen shadow-md overflow-y-auto">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Menu</h2>
        <nav className="space-y-2">
          <Link href="/" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              Dashboard
            </div>
          </Link>
          <Link href="/countries" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              Country
            </div>
          </Link>
          <Link href="/languages" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              Language
            </div>
          </Link>
          <Link href="/states" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              State
            </div>
          </Link>
          <Link href="/boards" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              Boards
            </div>
          </Link>
          <Link href="/classes" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              Classes
            </div>
          </Link>
          <Link href="/subjects" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              Subjects
            </div>
          </Link>
          <Link href="/chapters" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              Chapters
            </div>
          </Link>
          <Link href="/chapter_contents" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              Chapter Content
            </div>
          </Link>

          {/* <Link href="/certificates" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              Certificates
            </div>
          </Link>
          <Link href="/profiles" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              Profiles
            </div>
          </Link>

          <Link href="/tests" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              Tests
            </div>
          </Link>
          <Link href="/test_results" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              Test Results
            </div>
          </Link>
          <Link href="/topic_progress" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              Topic Progress
            </div>
          </Link>
          <Link href="/user_progress" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              User Progress
            </div>
          </Link>
          <Link href="/users" passHref>
            <div className="block p-3 bg-gray-100 rounded-lg hover:bg-white">
              Users
            </div>
          </Link> */}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

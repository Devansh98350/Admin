import React from "react";
import Layout from "../components/Layout";
// import Sidebar from "@/components/Sidebar";

const DashboardPage = () => {
  return (
    <Layout>
      {/* <Sidebar /> */}
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to the Admin Panel. Use the sidebar to navigate.</p>
    </Layout>
  );
};

export default DashboardPage;

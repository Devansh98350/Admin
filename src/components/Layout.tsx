"use client"; // This ensures that this component is a Client Component

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../redux/store"; // Adjust the path to your store
import Sidebar from "./Sidebar";
import "../styles/globals.css";

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <Provider store={store}>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64">
          <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </Provider>
  );
};

export default RootLayout;

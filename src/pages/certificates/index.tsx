"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCertificates } from "../../redux/slices/certificateSlice";
import Link from "next/link";
import Layout from "../../components/Layout";
import { AppDispatch, RootState } from "../../redux/store"; // Adjust this path based on your store setup

const CertificatesPage = () => {
  const dispatch: AppDispatch = useDispatch(); // Use typed dispatch

  // Use a safer way to select certificates
  const certificates = useSelector(
    (state: RootState) => state.certificate.certificates || []
  );
  const loading = useSelector((state: RootState) => state.certificate.loading);

  useEffect(() => {
    dispatch(fetchCertificates());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Check if certificates is an array before mapping
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Certificates</h1>
      <Link href="/certificates/create" passHref>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Create New Certificate
        </span>
      </Link>
      <ul>
        {Array.isArray(certificates) && certificates.length > 0 ? (
          certificates.map((certificate) => (
            <li key={certificate.id}>
              {certificate.name} - {certificate.description} -{" "}
              <Link href={`/certificates/${certificate.id}`}>Edit</Link>
            </li>
          ))
        ) : (
          <p>No certificates available.</p>
        )}
      </ul>
    </Layout>
  );
};

export default CertificatesPage;

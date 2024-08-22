"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createSubject } from "../../redux/slices/subjectSlice";
import { fetchClasses } from "../../redux/slices/classSlice";
import { fetchBoards } from "../../redux/slices/boardSlice";
import SubjectForm from "../../components/forms/SubjectForm";
import Layout from "../../components/Layout";

const CreateSubjectPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [subject, setSubject] = useState({
    subject_code: "",
    class_code: "",
    subject_name: "",
    board_code: "",
  });
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [errors, setErrors] = useState({});

  // Select classes and boards from the Redux store
  const classes = useSelector((state: any) => state.class.classes || []);
  const boards = useSelector((state: any) => state.board.boards || []);
  const classLoading = useSelector((state: any) => state.class.loading);
  const boardLoading = useSelector((state: any) => state.board.loading);
  const classError = useSelector((state: any) => state.class.error);
  const boardError = useSelector((state: any) => state.board.error);

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchBoards());
  }, [dispatch]);

  // Filter classes when board_code changes
  useEffect(() => {
    if (subject.board_code) {
      const filtered = classes.filter(
        (cls: any) => cls.board_code === subject.board_code
      );
      setFilteredClasses(filtered);
    } else {
      setFilteredClasses([]);
    }
  }, [subject.board_code, classes]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSubject({ ...subject, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createSubject(subject))
      .unwrap()
      .then(() => {
        router.push("/subjects");
      })
      .catch((error) => setErrors(error));
  };

  if (classLoading || boardLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (classError || boardError) {
    return (
      <p className="text-center text-red-500">
        Error: {classError || boardError}
      </p>
    );
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create New Subject
        </h1>
        <SubjectForm
          subject={subject}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
          classes={filteredClasses} // Use filtered classes here
          boards={boards}
        />
      </div>
    </Layout>
  );
};

export default CreateSubjectPage;

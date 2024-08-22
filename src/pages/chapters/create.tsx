import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChapters } from "../../redux/slices/chapterSlice";
import { fetchSubjects } from "../../redux/slices/subjectSlice";
import { useRouter } from "next/navigation";
import ChapterForm from "../../components/forms/ChapterForm";
import Layout from "../../components/Layout";
import { fetchClasses } from "../../redux/slices/classSlice";
import { fetchBoards } from "../../redux/slices/boardSlice";
import { AppDispatch, RootState } from "../../redux/store";

const CreateChapterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [chapter, setChapter] = useState({
    chapter_code: "",
    subject_code: "",
    class_code: "",
    chapter_name: "",
    board_code: "",
  });
  const [errors, setErrors] = useState({});

  const boards = useSelector((state: RootState) => state.board.boards);
  const classes = useSelector((state: RootState) => state.class.classes);
  const subjects = useSelector((state: RootState) => state.subject.subjects);

  useEffect(() => {
    dispatch(fetchBoards());
    dispatch(fetchClasses());
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setChapter({ ...chapter, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createChapters(chapter))
      .unwrap()
      .then(() => {
        router.push("/chapters");
      })
      .catch((error) => setErrors(error));
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Chapter
        </h1>
        <ChapterForm
          chapter={chapter}
          boards={boards}
          classes={classes}
          subjects={subjects}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </Layout>
  );
};

export default CreateChapterPage;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createChapterProgress } from "../../redux/slices/chapterProgressSlice";
import { useRouter } from "next/router";
import ChapterProgressForm from "../../components/forms/ChapterProgressForm";
import { AppDispatch } from "../../redux/store"; // Import AppDispatch

interface ProgressState {
  chapter_id: string;
  user_id: string;
  progress: string;
}

interface ErrorsState {
  chapter_id?: string;
  user_id?: string;
  progress?: string;
}

const CreateChapterProgressPage = () => {
  const dispatch = useDispatch<AppDispatch>(); // Type the dispatch function
  const router = useRouter();

  const [progress, setProgress] = useState<ProgressState>({
    chapter_id: "",
    user_id: "",
    progress: "",
  });
  const [errors, setErrors] = useState<ErrorsState>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProgress({ ...progress, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createChapterProgress(progress))
      .unwrap()
      .then(() => {
        router.push("/chapter_progress");
      })
      .catch((error) => setErrors(error));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Chapter Progress</h1>
      <ChapterProgressForm
        progress={progress}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
};

export default CreateChapterProgressPage;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChapterProgress } from '../../redux/slices/chapterProgressSlice';
import { useRouter } from 'next/router';
import ChapterProgressForm from '../../components/forms/ChapterProgressForm';

const CreateChapterProgressPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [progress, setProgress] = useState({ chapter_id: '', user_id: '', progress: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProgress({ ...progress, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createChapterProgress(progress))
      .unwrap()
      .then(() => {
        router.push('/chapter_progress');
      })
      .catch((error) => setErrors(error));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Chapter Progress</h1>
      <ChapterProgressForm progress={progress} onChange={handleChange} onSubmit={handleSubmit} errors={errors} />
    </div>
  );
};

export default CreateChapterProgressPage;

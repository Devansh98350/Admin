
import React from 'react';
import TextInput from '../TextInput';
import Button from '../Button';

const ChapterProgressForm = ({ progress, onChange, onSubmit, errors }) => (
  <form onSubmit={onSubmit}>
    <TextInput
      label="Chapter ID"
      name="chapter_id"
      value={progress.chapter_id}
      onChange={onChange}
      error={errors.chapter_id}
    />
    <TextInput
      label="Progress"
      name="progress"
      value={progress.progress}
      onChange={onChange}
      error={errors.progress}
    />
    <Button type="submit" label="Save" />
  </form>
);

export default ChapterProgressForm;

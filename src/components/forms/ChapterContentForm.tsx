
import React from 'react';
import TextInput from '../TextInput';
import Button from '../Button';

const ChapterContentForm = ({ content, onChange, onSubmit, errors }) => (
  <form onSubmit={onSubmit}>
    <TextInput
      label="Title"
      name="title"
      value={content.title}
      onChange={onChange}
      error={errors.title}
    />
    <TextInput
      label="Content"
      name="content"
      value={content.content}
      onChange={onChange}
      error={errors.content}
    />
    <Button type="submit" label="Save" />
  </form>
);

export default ChapterContentForm;

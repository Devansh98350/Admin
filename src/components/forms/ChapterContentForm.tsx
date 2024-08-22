import React, { ChangeEvent, FormEvent } from "react";
import TextInput from "../TextInput";
import Button from "../Button";

interface ChapterContentFormProps {
  content: {
    title: string;
    content: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errors: {
    title?: string;
    content?: string;
  };
}

const ChapterContentForm: React.FC<ChapterContentFormProps> = ({
  content,
  onChange,
  onSubmit,
  errors,
}) => (
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
    <Button type="submit" label="Save" onClick={undefined} />
  </form>
);

export default ChapterContentForm;

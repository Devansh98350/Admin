import React, { ChangeEvent, FormEvent } from "react";
import TextInput from "../TextInput";
import Button from "../Button";

interface ChapterProgressFormProps {
  progress: {
    chapter_id: string;
    progress: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errors: {
    chapter_id?: string;
    progress?: string;
  };
}

const ChapterProgressForm: React.FC<ChapterProgressFormProps> = ({
  progress,
  onChange,
  onSubmit,
  errors,
}) => (
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
    <Button type="submit" label="Save" onClick={undefined} />
  </form>
);

export default ChapterProgressForm;

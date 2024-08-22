import React, { ChangeEvent, FormEvent } from "react";
import TextInput from "../TextInput";
import Button from "../Button";

interface BoardFormProps {
  board: {
    name: string;
    description: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errors: {
    name?: string;
    description?: string;
  };
}

const BoardForm: React.FC<BoardFormProps> = ({
  board,
  onChange,
  onSubmit,
  errors,
}) => (
  <form onSubmit={onSubmit}>
    <TextInput
      label="Board Name"
      name="name"
      value={board.name}
      onChange={onChange}
      error={errors.name}
    />
    <TextInput
      label="Description"
      name="description"
      value={board.description}
      onChange={onChange}
      error={errors.description}
    />
    <Button type="submit" label="Save" onClick={undefined} />
  </form>
);

export default BoardForm;

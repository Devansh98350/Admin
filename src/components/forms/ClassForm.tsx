import React, { ChangeEvent, FormEvent } from "react";
import TextInput from "../TextInput";
import Button from "../Button";

interface ClassFormProps {
  cls: {
    name: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errors: {
    name?: string;
  };
}

const ClassForm: React.FC<ClassFormProps> = ({
  cls,
  onChange,
  onSubmit,
  errors,
}) => (
  <form onSubmit={onSubmit}>
    <TextInput
      label="Class Name"
      name="name"
      value={cls.name}
      onChange={onChange}
      error={errors.name}
    />
    <Button type="submit" label="Save" onClick={undefined} />
  </form>
);

export default ClassForm;

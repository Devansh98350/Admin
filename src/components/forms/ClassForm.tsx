
import React from 'react';
import TextInput from '../TextInput';
import Button from '../Button';

const ClassForm = ({ cls, onChange, onSubmit, errors }) => (
  <form onSubmit={onSubmit}>
    <TextInput
      label="Class Name"
      name="name"
      value={cls.name}
      onChange={onChange}
      error={errors.name}
    />
    <Button type="submit" label="Save" />
  </form>
);

export default ClassForm;

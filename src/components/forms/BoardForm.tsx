
import React from 'react';
import TextInput from '../TextInput';
import Button from '../Button';

const BoardForm = ({ board, onChange, onSubmit, errors }) => (
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
    <Button type="submit" label="Save" />
  </form>
);

export default BoardForm;

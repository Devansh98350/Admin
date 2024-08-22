// ProfileForm.tsx
import React from "react";

interface ProfileFormProps {
  profile: {
    student_name: string;
    school_name: string;
    age: string;
    board_id: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors: any;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onChange,
  onSubmit,
  errors,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="student_name"
        >
          Student Name
        </label>
        <input
          id="student_name"
          name="student_name"
          type="text"
          value={profile.student_name}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter student name"
        />
        {errors.student_name && (
          <p className="text-red-500 text-xs mt-1">{errors.student_name}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="school_name"
        >
          School Name
        </label>
        <input
          id="school_name"
          name="school_name"
          type="text"
          value={profile.school_name}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter school name"
        />
        {errors.school_name && (
          <p className="text-red-500 text-xs mt-1">{errors.school_name}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="age"
        >
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          value={profile.age}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter age"
        />
        {errors.age && (
          <p className="text-red-500 text-xs mt-1">{errors.age}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="board_id"
        >
          Board ID
        </label>
        <input
          id="board_id"
          name="board_id"
          type="text"
          value={profile.board_id}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter board ID"
        />
        {errors.board_id && (
          <p className="text-red-500 text-xs mt-1">{errors.board_id}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Profile
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;

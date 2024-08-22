import React from "react";

interface SubjectFormProps {
  subject: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors: any;
  classes: any[];
  boards: any[];
}

const SubjectForm: React.FC<SubjectFormProps> = ({
  subject,
  onChange,
  onSubmit,
  errors,
  classes,
  boards,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="board_code"
        >
          Board Code
        </label>
        <select
          name="board_code"
          value={subject.board_code}
          onChange={onChange}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Board</option>
          {boards.map((board) => (
            <option key={board.board_code} value={board.board_code}>
              {board.board_code}
            </option>
          ))}
        </select>
        {errors.board_code && (
          <p className="text-red-500 text-xs italic">{errors.board_code}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="class_code"
        >
          Class Code
        </label>
        <select
          name="class_code"
          value={subject.class_code}
          onChange={onChange}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls.class_code} value={cls.class_code}>
              {cls.class_name}
            </option>
          ))}
        </select>
        {errors.class_code && (
          <p className="text-red-500 text-xs italic">{errors.class_code}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="subject_code"
        >
          Subject Code
        </label>
        <input
          type="text"
          name="subject_code"
          value={subject.subject_code}
          onChange={onChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.subject_code && (
          <p className="text-red-500 text-xs italic">{errors.subject_code}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="subject_name"
        >
          Subject Name
        </label>
        <input
          type="text"
          name="subject_name"
          value={subject.subject_name}
          onChange={onChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.subject_name && (
          <p className="text-red-500 text-xs italic">{errors.subject_name}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Subject
        </button>
      </div>
    </form>
  );
};

export default SubjectForm;

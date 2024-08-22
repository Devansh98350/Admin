import React, { useEffect, useState } from "react";

interface Chapter {
  chapter_code: string;
  subject_code: string;
  class_code: string;
  chapter_name: string;
  board_code: string;
}

interface Board {
  board_code: string;
  // Add other properties as needed
}

interface Class {
  class_code: string;
  class_name: string;
  board_code: string;
}

interface Subject {
  subject_code: string;
  subject_name: string;
  board_code: string;
  class_code: string;
}

interface ChapterFormProps {
  chapter: Chapter;
  boards: Board[];
  classes: Class[];
  subjects: Subject[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors: {
    board_code?: string;
    class_code?: string;
    subject_code?: string;
    chapter_code?: string;
    chapter_name?: string;
  };
}

const ChapterForm: React.FC<ChapterFormProps> = ({
  chapter,
  boards,
  classes,
  subjects,
  onChange,
  onSubmit,
  errors,
}) => {
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    // Filter classes based on selected board_code
    setFilteredClasses(
      classes.filter((cls) => cls.board_code === chapter.board_code)
    );
  }, [chapter.board_code, classes]);

  useEffect(() => {
    // Filter subjects based on selected board_code and class_code
    setFilteredSubjects(
      subjects.filter(
        (subject) =>
          subject.board_code === chapter.board_code &&
          subject.class_code === chapter.class_code
      )
    );
  }, [chapter.board_code, chapter.class_code, subjects]);

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
          value={chapter.board_code}
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
          value={chapter.class_code}
          onChange={onChange}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Class</option>
          {filteredClasses.map((cls) => (
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
        <select
          name="subject_code"
          value={chapter.subject_code}
          onChange={onChange}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Subject</option>
          {filteredSubjects.map((subject) => (
            <option key={subject.subject_code} value={subject.subject_code}>
              {subject.subject_name}
            </option>
          ))}
        </select>
        {errors.subject_code && (
          <p className="text-red-500 text-xs italic">{errors.subject_code}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="chapter_code"
        >
          Chapter Code
        </label>
        <input
          type="text"
          name="chapter_code"
          value={chapter.chapter_code}
          onChange={onChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.chapter_code && (
          <p className="text-red-500 text-xs italic">{errors.chapter_code}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="chapter_name"
        >
          Chapter Name
        </label>
        <input
          type="text"
          name="chapter_name"
          value={chapter.chapter_name}
          onChange={onChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.chapter_name && (
          <p className="text-red-500 text-xs italic">{errors.chapter_name}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Chapter
        </button>
      </div>
    </form>
  );
};

export default ChapterForm;

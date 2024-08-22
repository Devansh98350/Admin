// TestForm.tsx
import React from "react";

interface TestFormProps {
  test: { name: string; chapter_id: string };
  chapters: any[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors: any;
}

const TestForm: React.FC<TestFormProps> = ({
  test,
  chapters,
  onChange,
  onSubmit,
  errors,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={test.name}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter test name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="chapter_id"
        >
          Chapter
        </label>
        <select
          id="chapter_id"
          name="chapter_id"
          value={test.chapter_id}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a chapter</option>
          {Array.isArray(chapters) &&
            chapters.map((chapter: any) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.name}
              </option>
            ))}
        </select>
        {errors.chapter_id && (
          <p className="text-red-500 text-xs mt-1">{errors.chapter_id}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Test
        </button>
      </div>
    </form>
  );
};

export default TestForm;

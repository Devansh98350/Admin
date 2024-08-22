// TestResultForm.tsx
import React from "react";

interface TestResultFormProps {
  result: { score: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors: any;
}

const TestResultForm: React.FC<TestResultFormProps> = ({
  result,
  onChange,
  onSubmit,
  errors,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="score"
        >
          Score
        </label>
        <input
          id="score"
          name="score"
          type="text"
          value={result.score}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter test score"
        />
        {errors.score && (
          <p className="text-red-500 text-xs mt-1">{errors.score}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Test Result
        </button>
      </div>
    </form>
  );
};

export default TestResultForm;

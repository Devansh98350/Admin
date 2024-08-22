import React from "react";

interface LanguageFormProps {
  language: { language_name: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors: any;
}

const LanguageForm: React.FC<LanguageFormProps> = ({
  language,
  onChange,
  onSubmit,
  errors,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="language_name"
        >
          Language Name
        </label>
        <input
          id="language_name"
          name="language_name"
          type="text"
          value={language.language_name}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter language name"
        />
        {errors.language_name && (
          <p className="text-red-500 text-xs mt-1">{errors.language_name}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Language
        </button>
      </div>
    </form>
  );
};

export default LanguageForm;

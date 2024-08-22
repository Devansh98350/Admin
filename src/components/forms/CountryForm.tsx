import React from "react";

const CountryForm = ({ country, onChange, onSubmit, errors }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Country Name
        </label>
        <input
          id="name"
          type="text"
          name="country_name" // Updated
          value={country.country_name}
          onChange={onChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.country_name ? "border-red-500" : ""
          }`}
        />
        {errors.country_name && (
          <p className="text-red-500 text-xs italic">{errors.country_name}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="code"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Country Code
        </label>
        <input
          id="code"
          type="text"
          name="country_code" // Updated
          value={country.country_code}
          onChange={onChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.country_code ? "border-red-500" : ""
          }`}
        />
        {errors.country_code && (
          <p className="text-red-500 text-xs italic">{errors.country_code}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Country
      </button>
    </form>
  );
};

export default CountryForm;

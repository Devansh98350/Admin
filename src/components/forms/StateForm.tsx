import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../redux/slices/countrySlice"; // Ensure this action is correctly imported

const StateForm = ({ state, onChange, onSubmit, errors }) => {
  const dispatch = useDispatch();
  const { countries, loading, error } = useSelector((state) => state.country);
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries())
        .unwrap()
        .then((data) => {
          setCountryOptions(data); // Set the available country options
        })
        .catch((error) => console.error("Failed to fetch countries:", error));
    } else {
      setCountryOptions(countries);
    }
  }, [dispatch, countries]);

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label
          htmlFor="country_code"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Country Code
        </label>
        <select
          id="country_code"
          name="country_code"
          value={state.country_code || ""}
          onChange={onChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.country_code ? "border-red-500" : ""
          }`}
        >
          <option value="">Select Country Code</option>
          {countryOptions.map((country) => (
            <option key={country.id} value={country.country_code}>
              {country.country_name} ({country.country_code})
            </option>
          ))}
        </select>
        {errors.country_code && (
          <p className="text-red-500 text-xs italic">{errors.country_code}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="state_name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          State Name
        </label>
        <input
          id="state_name"
          type="text"
          name="state_name"
          value={state.state_name || ""}
          onChange={onChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.state_name ? "border-red-500" : ""
          }`}
        />
        {errors.state_name && (
          <p className="text-red-500 text-xs italic">{errors.state_name}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="state_code"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          State Code
        </label>
        <input
          id="state_code"
          type="text"
          name="state_code"
          value={state.state_code || ""}
          onChange={onChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.state_code ? "border-red-500" : ""
          }`}
        />
        {errors.state_code && (
          <p className="text-red-500 text-xs italic">{errors.state_code}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={loading} // Optional: Disable button during loading
      >
        {loading ? "Creating..." : "Create State"}{" "}
        {/* Optional: Show loading state */}
      </button>
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}{" "}
      {/* Optional: Display general error */}
    </form>
  );
};

export default StateForm;

import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, name, value, onChange, defaultOption, options, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: [target.name], value: target.value });
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((key) => ({
        name: options[key].name,
        _id: options[key]._id
      }))
      : options;

  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        className={`form-select is-${error ? "invalid" : "valid"}`}
        id="validationCustom04"
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string
};

export default SelectField;

import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, rows, onChange, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: [target.name], value: target.value });
  };

  return (
    <div className="mb-4">
      <label className="form-label" htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          onChange={handleChange}
          rows={rows}
          id={name}
          value={value}
          name={name}
          className={`form-control is-${error ? "invalid" : "valid"}`}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  rows: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default TextAreaField;

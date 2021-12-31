import React from "react";
import PropTypes from "prop-types";

const CheckboxField = ({ name, value, onChange, children, error }) => {
  const handleChange = () => {
    onChange({ name: name, value: !value });
  };
  return (
    <div className="form-check mb-4">
      <input
        onChange={handleChange}
        className="form-check-input"
        type="checkbox"
        value=""
        id={name}
        checked={value}
      />
      <label className={`form-check-label is-${error ? "invalid" : ""}`} htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CheckboxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default CheckboxField;

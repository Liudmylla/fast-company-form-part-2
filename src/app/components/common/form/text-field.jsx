import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }) => {
    onChange({ name: [target.name], value: target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="mb-4">
      <label className="form-label" htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          onChange={handleChange}
          type={showPassword ? "text" : type}
          id={name}
          value={value}
          name={name}
          className={`form-control is-${error ? "invalid" : "valid"}`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="btn btn-outline-secondary"
          >
            <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: "text"
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default TextField;

import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ name, options, onChange, label, defaultValue }) => {
  const defaultValueToArray = defaultValue.map((value) => ({
    label: value.name,
    value: value._id
  }));

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((key) => ({
        label: options[key].name,
        value: options[key]._id
      }))
      : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        name={name}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        placeholder="Выбрать качества..."
        isMulti
        options={optionsArray}
        closeMenuOnSelect={false}
        defaultValue={defaultValueToArray}
      />
    </div>
  );
};

MultiSelectField.defaultProps = {
  defaultValue: []
};

MultiSelectField.propTypes = {
  name: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  label: PropTypes.string,
  defaultValue: PropTypes.array
};

export default MultiSelectField;

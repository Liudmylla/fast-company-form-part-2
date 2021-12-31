import React from "react";
import PropTypes from "prop-types";

const Quality = ({ color, name }) => {
  return <span className={`badge bg-${color} me-1`}>{name}</span>;
};

Quality.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default Quality;

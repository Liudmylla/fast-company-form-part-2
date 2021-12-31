import React from "react";
import PropTypes from "prop-types";
import { useProfessions } from "../../hooks/use-profession";

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions();
  const profession = getProfession(id);

  return <>{!isLoading ? <span>{profession.name}</span> : <h3>Loading...</h3>}</>;
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;

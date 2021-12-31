import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/use-qualities";

const QualitiesList = ({ ids }) => {
  const { isLoading, getQualities } = useQualities();
  const qualities = getQualities(ids);

  return (
    <>
      {!isLoading ? qualities.map((quality) => (
        <Quality key={quality._id} {...quality} />
      )) : <h3>Loading...</h3>}
    </>
  );
};

QualitiesList.propTypes = {
  ids: PropTypes.array.isRequired
};

export default QualitiesList;

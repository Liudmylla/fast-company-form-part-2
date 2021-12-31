import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import professionService from "../services/profession.service";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
  return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [professions, setProfessions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfessionsList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(`Status ${error.status}. ${error.statusText}`);
      setError(null);
    }
  }, [error]);

  const getProfession = (id) => {
    return professions.find((profession) => profession._id === id);
  };

  async function getProfessionsList() {
    try {
      const { content } = await professionService.get();
      setProfessions(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function errorCatcher(error) {
    const { status, statusText } = error.response;
    setError({ statusText, status });
    setIsLoading(false);
  }

  return (
    <ProfessionContext.Provider value={{ isLoading, professions, getProfession }}>
      {children}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

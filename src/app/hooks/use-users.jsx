import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import userService from "../services/user.service";

const UsersContext = React.createContext();

export const useUsers = () => {
  return useContext(UsersContext);
};

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(`Status ${error.status}. ${error.statusText}`);
      setError(null);
    }
  }, [error]);

  async function getUsers() {
    try {
      const { content } = await userService.get();
      setUsers(content);
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
    <UsersContext.Provider value={{ users }}>
      {!isLoading ? children : <h3>Loading...</h3>}
    </UsersContext.Provider>
  );
};

UsersProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UsersProvider;

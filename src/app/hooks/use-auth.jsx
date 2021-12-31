import React, { useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const webAPIKye = "AIzaSyCuhtb0uDi5R8Y41dR4rdt603FYdJjqkls";
  const signUp = async ({ email, password }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webAPIKye}`;
    const { data } = await httpAuth.post(url, {
      email,
      password,
      returnSecureToken: true
    });
    console.log(data);
  };
  return (
    <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

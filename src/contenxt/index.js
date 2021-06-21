/* eslint-disable consistent-return */
import { createContext, useEffect, useState } from 'react';
import { isExpired } from 'react-jwt';
import { Redirect } from 'react-router-dom';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('jobHunter'));
      const isMyTokenExpired = isExpired(userData);

      if (isMyTokenExpired) {
        return <Redirect to="/login" />;
      }

      setLoggedIn(true);
      setCurrentUser(JSON.parse(atob(userData.split('.')[1])));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const data = {
    currentUser,
    setCurrentUser,
    setLoggedIn,
    loggedIn,
  };
  return <JobContext.Provider value={data}>{children}</JobContext.Provider>;
};

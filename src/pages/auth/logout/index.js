import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { JobContext } from '../../../contenxt';

function Logout() {
  const { setCurrentUser, setLoggedIn } = useContext(JobContext);
  const history = useHistory();
  const logoutBtn = () => {
    localStorage.removeItem('jobHunter');
    setCurrentUser({});
    setLoggedIn(false);
    history.push('/');
  };
  return (
    <button className="btn btn-danger" type="button" onClick={logoutBtn}>
      Logout
    </button>
  );
}

export default Logout;

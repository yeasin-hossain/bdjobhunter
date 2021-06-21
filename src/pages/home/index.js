import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { JobContext } from '../../contenxt';
import style from './style.module.scss';

function Home() {
  const { currentUser } = useContext(JobContext);

  return (
    <div className="container">
      <div className={style.home}>
        <div className="row">
          {!currentUser && (
            <div className="col-md-6">
              <h1>Change Your Carrier</h1>
              <h3>Join With Us</h3>
              <Link className="btn btn-warning" to="/register">
                Join
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

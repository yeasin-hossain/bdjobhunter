import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.scss';

function Home() {
  return (
    <div className="container">
      <div className={style.home}>
        <div className="row">
          <div className="col-md-6">
            <h1>Change Your Carrier</h1>
            <h3>Join With Us</h3>
            <Link className="btn btn-warning" to="/register">
              Join
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

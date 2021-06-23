import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import style from './style.module.scss';

function Home() {
  // const { currentUser } = useContext(JobContext);

  return (
    <div className="container">
      <div className={style.home}>
        <div className="row">
          <div className="col-md-6">
            <div className="card m-3">
              <div className="card-body">
                <div className="card-title">
                  Want to serve your talent? Looking Best Company to join? Hit Jobs Button And Find
                  your Dream
                </div>
              </div>
              <div className="card-footer">
                <Link className="btn btn-primary ml-2" to="/jobs">
                  Jobs
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card m-3">
              <div className="card-body">
                <div className="card-title">
                  Find best talent for your empty chair, easy to post circular, low cost and many
                  more features.
                </div>
              </div>
              <div className="card-footer">
                <Link className="btn btn-primary ml-2" to="/management/addJob">
                  Post A job
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Carousel />
      </div>
    </div>
  );
}

export default Home;

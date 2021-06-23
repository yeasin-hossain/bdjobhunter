/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

function Carousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="my-5">
      <h1 className="text-center my-3"> Thousands of reputed Company Posted Their Vacancy </h1>
      <Slider {...settings}>
        <div>
          <div className="card m-2">
            <div className="card-header">
              <div className="card-title">HappyDesk</div>
            </div>
            <div className="card-body">
              <div className="card-title">
                WE Hired Our Full-Stack Developer, And We Grow Much More Better
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card m-2">
            <div className="card-header">
              <div className="card-title">HappyDesk</div>
            </div>
            <div className="card-body">
              <div className="card-title">
                WE Hired Our Full-Stack Developer, And We Grow Much More Better
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card m-2">
            <div className="card-header">
              <div className="card-title">HappyDesk</div>
            </div>
            <div className="card-body">
              <div className="card-title">
                WE Hired Our Full-Stack Developer, And We Grow Much More Better
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card m-2">
            <div className="card-header">
              <div className="card-title">HappyDesk</div>
            </div>
            <div className="card-body">
              <div className="card-title">
                WE Hired Our Full-Stack Developer, And We Grow Much More Better
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card m-2">
            <div className="card-header">
              <div className="card-title">Shanto Rahman</div>
            </div>
            <div className="card-body">
              <div className="card-title">I got my dream , applied from JOB HUNTER BD</div>
            </div>
          </div>
        </div>
        <div>
          <div className="card m-2">
            <div className="card-header">
              <div className="card-title">HappyDesk</div>
            </div>
            <div className="card-body">
              <div className="card-title">
                WE Hired Our Full-Stack Developer, And We Grow Much More Better
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;

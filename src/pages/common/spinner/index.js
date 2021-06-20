import React from 'react';
import walk from '../../../static/images/Walk.gif';
import style from './style.module.scss';

function Spinner() {
  return (
    <div className={style.spinner}>
      <img src={walk} alt="spinner" />
    </div>
  );
}

export default Spinner;

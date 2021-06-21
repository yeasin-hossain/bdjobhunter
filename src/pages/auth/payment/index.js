/* eslint-disable no-nested-ternary */
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { JobContext } from '../../../contenxt';
import StripeForm from './stripe';

function Payment() {
  const { currentUser } = useContext(JobContext);
  const [selectedPackage, setSelectedPackage] = useState({});
  const stripePromise = loadStripe(process.env.REACT_APP_Stripe_Api_Key);
  const history = useHistory();
  useEffect(() => {
    // if user josPoster and already paid, can't visit this page
    const { paid, role } = currentUser;
    if (role === 'jobPoster') {
      if (paid) {
        history.push('/');
      }
    } else {
      history.push('/');
    }
  }, [currentUser, history]);
  return (
    <div>
      <div className="d-flex justify-content-center flex-column">
        <h1 className="text-center">Please choice your package</h1>
        <select
          className="form-select w-50"
          aria-label="Default select example"
          name="service"
          onClick={(e) =>
            setSelectedPackage((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        >
          <option selected>Open this select menu</option>
          <option value="premium">Premium</option>
          <option value="standard">Standard</option>
          <option value="basic">Basic</option>
        </select>
      </div>
      <Elements stripe={stripePromise}>
        <StripeForm selectedPackage={selectedPackage} />
      </Elements>
    </div>
  );
}

export default Payment;

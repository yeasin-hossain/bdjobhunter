/* eslint-disable no-nested-ternary */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { JobContext } from '../../../../contenxt';
import { getFromStorage, saveInStorage } from '../../../../util/localStore';

const cardOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};
function StripeForm({ selectedPackage }) {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(JobContext);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      toast.error(error.message);
    } else {
      try {
        const { type } = paymentMethod;

        const orderInfoWithStripe = {
          ...selectedPackage,
          cardType: type,
          paid: true,
          postLimit:
            selectedPackage.service === 'premium'
              ? 30
              : selectedPackage.service === 'standard'
              ? 20
              : 10,
        };
        const { id } = currentUser;
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/${id}`,
          orderInfoWithStripe,
          {
            headers: {
              Authorization: `Bearer ${getFromStorage()}`,
            },
          }
        );
        saveInStorage(response.data.response.token);
        setCurrentUser(JSON.parse(atob(response.data.response.token.split('.')[1])));
        toast.success('Payment Successfully Done');
        history.push('/management/postedJobs');
      } catch (err) {
        console.log(err);
        toast.error('something want wrong');
      }
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <CardElement options={cardOptions} />
        <button type="submit" className="btn btn-primary mt-3" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
}

export default StripeForm;

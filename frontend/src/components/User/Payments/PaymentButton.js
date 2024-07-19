import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  BASE_USER } from '../../../utils/constants';

const RAZORPAY_KEY_ID = 'rzp_test_Csz5mNjOu2Dwz7'

// can move this to src/utils/loadRazorpay.js and import here
// import loadRazorpay from '../utils/loadRazorpay';
const loadRazorpay = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
// export default loadRazorpay;

const PaymentButton = () => {
  //hardcoded data for testing purpose only please update this
  const [paymentData, setPaymentData] = useState({
    amount: 860,
    currency: 'INR',
    clientName: 'David Fosh',
    clientEmail : 'david.fosh@email.com',
    clientId: '12346785',
    therapistName: 'Dr. Stephen',
    therapistId: '1234',
    appointmentType: 'Individual',
    therapyType: 'Cognitive Behavioral Therapy'
  });
  const navigate = useNavigate();

  const handlePayment = async () => {
    const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Payment processing error. Please check your internet connection and try again.');
      return;
    }
    try {
      const response = await axios.post(BASE_USER + '/Neworder', paymentData);
      const order = response.data;
      const options = {

        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Around Within',
        description: 'Test Transaction',
        order_id: order.order_id,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6fb58034307f07517c9e0c497e461fc4e31eb7bf01576cfcb2c328b28bd1eb1d',
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(BASE_USER + '/verifyPayment', response);
            
            const verifyResult = verifyResponse.data;
            if (verifyResult.success) {
              // set redirect to payment success page
              window.open(verifyResult.invoiceUrl, 'Invoice', 'width=1000,height=800');
              navigate('/user-billings');
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Payment verification failed');
          }
        },
        //user details will be filled automatically if availiable here
        prefill: {
          name: paymentData.clientName,
          email: paymentData.email
          // contact: '9999999999'
        },
        theme: { color: '#B3F0FF'}
      };
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', async (response) => {
        try {
          console.error(response.error.description)
          const paymentDetails = {
            order_Id: response.error.metadata.order_id,
            payment_Id: response.error.metadata.payment_id,
          };
          const updateResponse = await axios.post(BASE_USER + '/updatePaymentStatus', paymentDetails);

          const updateResult = updateResponse.data;
          if (updateResult.success) {
            console.log('Payment failed, Status has been updated.');
          } else {
            console.error('Payment failed, Failed to update payment status');
          }
        } catch (error) {
          console.error('Error updating payment status:', error.response,error.response.data);
        }
      });
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <button onClick={handlePayment}>Make Payment</button>
  );
};

export default PaymentButton;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  //hardcoded data for testing purpose please update this
  const [paymentData, setPaymentData] = useState({
    amount: 300,
    currency: 'INR',
    clientName: 'Ethan',
    clientEmail : 'ethan00@email.com',
    clientId: '12346',
    therapistName: 'Dr. Stephen',
    therapistId: '1234',
    appointmentType: 'Individual',
    therapyType: 'Depression'
  });
  // const [invoiceUrl, setInvoiceUrl] = useState('');
  const navigate = useNavigate();

  const handlePayment = async () => {
    const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Payment processing error. Please check your internet connection and try again.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/api/users/Neworder', paymentData);
      const order = response.data;
      console.log(order)
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Around Within',
        description: 'Test Transaction',
        order_id: order.order_id,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6fb58034307f07517c9e0c497e461fc4e31eb7bf01576cfcb2c328b28bd1eb1d',
        handler: async (response) => {
          console.log(response)
          try {
            const verifyResponse = await axios.post('http://localhost:4000/api/users/verifyPayment', response);
            
            const verifyResult = verifyResponse.data;
            console.log(verifyResult)
            if (verifyResult.success) {
              // set redirect to payment success page
              // alert('Payment successful');
              // window.location.href = verifyResult.invoiceUrl
              window.open(verifyResult.invoiceUrl, 'Invoice', 'width=1000,height=800');
              navigate('/user-billings');
              // setInvoiceUrl(verifyResult.invoiceUrl);
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
          console.log(response)
          const paymentDetails = {
            order_Id: response.error.metadata.order_id,
            payment_Id: response.error.metadata.payment_id,
          };
          const updateResponse = await axios.post('http://localhost:4000/api/users/updatePaymentStatus', paymentDetails);
          const updateResult = updateResponse.data;
          if (updateResult.success) {
            console.log('Payment failed, Status has been updated.');
          } else {
            console.error('Payment failed, Failed to update payment status');
          }
        } catch (error) {
          console.error('Error updating payment status:', error.response,error.response.data);
        }
        alert("payment failed")
        console.log(response.error)
      });
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <button onClick={handlePayment}>Make Payment</button>
    // <div>
    //   <button onClick={handlePayment}>Pay Now</button>
    //   {invoiceUrl && (
    //     <div>
    //       <iframe src={invoiceUrl} width="100%" height="600px"></iframe>
    //     </div>
    //   )}
    // </div>
  );
};

export default PaymentButton;

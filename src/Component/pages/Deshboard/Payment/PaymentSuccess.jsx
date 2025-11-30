import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const parcelId = searchParams.get('parcelId');
  const axiosSecure = UseAxiosSecure();

  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId && parcelId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}&parcelId=${parcelId}`)
        .then(res => {
          setPaymentData(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [sessionId, parcelId, axiosSecure]);

  if (loading) {
    return <p className="text-center mt-20 text-xl">Processing your payment...</p>;
  }

  if (!paymentData?.success) {
    return <p className="text-center mt-20 text-red-600 text-xl">Payment Failed or Not Verified ❌</p>;
  }

  return (
    <div className="text-center mt-20">
      <h2 className="text-4xl font-bold text-green-500">Payment Successful ✅</h2>
      <p className="text-lg mt-2">Your parcel payment has been updated.</p>

      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg inline-block text-left min-w-[300px]">
        <p><strong>Parcel Name:</strong> {paymentData.paymentInfo?.parcelName || 'N/A'}</p>
        <p><strong>Tracking ID:</strong> {paymentData.trackingId || 'N/A'}</p>
        <p><strong>Transaction ID:</strong> {paymentData.transactionId || 'N/A'}</p>
        <p>
          <strong>Amount Paid:</strong> ${paymentData.paymentInfo?.amount || 0} {paymentData.paymentInfo?.currency?.toUpperCase()}
        </p>
        <p><strong>Paid At:</strong> {paymentData.paymentInfo?.paidAt ? new Date(paymentData.paymentInfo.paidAt).toLocaleString() : 'N/A'}</p>
      </div>

      <a 
        href="/deshboard/payment-history"
        className="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Go Back to Dashboard
      </a>
    </div>
  );
};

export default PaymentSuccess;

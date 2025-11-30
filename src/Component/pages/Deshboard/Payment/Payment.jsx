import React, { useState } from 'react';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

const Payment = () => {
  const axiosSecure = UseAxiosSecure();
  const { parcelId } = useParams();
  const [isProcessing, setIsProcessing] = useState(false);

  const { isLoading, data: parcel } = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/percels/${parcelId}`);
      console.log('Parcel fetched:', res.data); // check cost
      return res.data;
    },
    enabled: !!parcelId
  });

  const handlePayment = async () => {
    if (!parcel) return;
    setIsProcessing(true);

    try {
      const res = await axiosSecure.post('/create-checkout-session', {
        parcelId: parcel._id,
        parcelName: parcel.parcelName,
        senderEmail: parcel.senderEmail,
        cost: parcel.cost
      });

      if (res.data.url) {
        console.log(res.data.sessionId);
        window.location.href = res.data.url; // redirect to Stripe
      }
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-infinity loading-xl"></span>
    </div>
  );

  if (!parcel) return <div>Parcel not found!</div>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded text-center">
      <h2 className="text-xl font-bold mb-4">
        Please pay ${parcel.cost} for: {parcel.parcelName}
      </h2>
      <button
        onClick={handlePayment}
        className="btn btn-primary w-full"
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default Payment;

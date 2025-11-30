import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';
import useAuth from '../../../Hook/useAuth';


const PaymentHistory = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/payment-history?email=${user?.email}`)
      .then(res => setPayments(res.data))
      .catch(err => console.error(err));
  }, [user, axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Payment History</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Parcel Name</th>
            <th className="p-2 border">Amount Paid</th>
            <th className="p-2 border">Transaction ID</th>
            <th className="p-2 border">Tracking ID</th>
            <th className="p-2 border">Paid Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p._id}>
              <td className="p-2 border">{p.parcelName}</td>
              <td className="p-2 border">${p.amount}</td>
              <td className="p-2 border">{p.transactionId}</td>
              <td className="p-2 border">{p.trackingId}</td>
              <td className="p-2 border">{new Date(p.paidAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;

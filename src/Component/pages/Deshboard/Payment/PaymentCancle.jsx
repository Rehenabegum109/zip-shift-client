import React from 'react';
import { Link, useLocation } from 'react-router';

const PaymentCancle = () => {
      const location = useLocation();
  const params = new URLSearchParams(location.search);
  const parcelId = params.get('parcelId');
    return (
        <div>
            <h2 className="text-4xl">payment cancled</h2>
                  {parcelId && <p>Parcel ID: {parcelId}</p>}
            <Link to='/deshboard/my-percel'><button className='btn btn-primary text-black'>Try again</button></Link>
        </div>
    );
};

export default PaymentCancle;
import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({reviewed}) => {
    const {review,userName,user_photourl,date} =reviewed
    return (
          <div className="card w-96 bg-base-100 shadow-xl p-4">
      <div className="flex items-start gap-3">
        <FaQuoteLeft className="text-gray-400 opacity-70 text-2xl" />
        <p className="text-gray-700">
          {review}
        </p>
      </div>
      < div className=' flex items-center gap-4'>
      <div className='w-10 h-10 rounded-full bg-primary'> 
        <img src={user_photourl} alt="" />
      </div>

     
      <div className="mt-4 text-right">
        <span className="font-semibold">- {userName}</span>

      </div>
       </div>
    </div>

    );
};

export default ReviewCard;
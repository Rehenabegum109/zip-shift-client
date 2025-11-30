import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../../../Howitworks/howItWorks';
import Service from '../../../Service/Service';
import Brand from '../../../Brand/Brand';
import Reviews from '../../../Reviews/Reviews';

const reviewsPromise =fetch('/review.json').then(res =>res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
        <HowItWorks></HowItWorks>
        <Service></Service>
        <Brand></Brand>
        <Reviews reviewsPromise={reviewsPromise}></Reviews>
        </div>
    );
};

export default Home;
import React from "react";

const HowItWorks = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white shadow-lg p-6 rounded-xl">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">1. Place Your Order</h3>
            <p className="text-gray-600">
              Choose your products and complete the order on our website.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white shadow-lg p-6 rounded-xl">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">2. We Ship It</h3>
            <p className="text-gray-600">
              Your package is packed safely and shipped to your address.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white shadow-lg p-6 rounded-xl">
            <div className="text-4xl mb-4">📬</div>
            <h3 className="text-xl font-semibold mb-2">3. Track & Receive</h3>
            <p className="text-gray-600">
              Track your shipment in real time and receive it at your doorstep.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

import React from "react";

const Service = () => {
  return (
    <div className="py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold text-white mb-10">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Service 1 */}
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
            <p className="text-gray-600">
              Quick & reliable delivery to your destination.
            </p>
          </div>

          {/* Service 2 */}
          <div className="p-6 bg-primary rounded-xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">Secure Packaging</h3>
            <p className="text-gray-600">
              Every product is packed safely to prevent damage.
            </p>
          </div>

          {/* Service 3 */}
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
            <p className="text-gray-600">
              Track your orders anytime on our website.
            </p>
          </div>

          {/* Service 4 */}
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">Easy Payment</h3>
            <p className="text-gray-600">
              Multiple secure payment methods available.
            </p>
          </div>

          {/* Service 5 */}
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold mb-2">Worldwide Delivery</h3>
            <p className="text-gray-600">
              We deliver to any location globally.
            </p>
          </div>

          {/* Service 6 */}
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our team is always available for help.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Service;

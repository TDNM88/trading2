import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Premium = () => {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Premium Access</h1>
          <p className="text-xl text-gray-400">Get access to our professional trading tools</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Starter",
              price: "49",
              features: [
                "Basic Trading Indicators",
                "Email Support",
                "Trading Community Access",
                "Basic Tutorial Access"
              ]
            },
            {
              title: "Professional",
              price: "99",
              popular: true,
              features: [
                "Advanced Trading Indicators",
                "Priority Support",
                "Trading Community Access",
                "Full Tutorial Access",
                "Weekly Market Analysis",
                "1-on-1 Strategy Session"
              ]
            },
            {
              title: "Enterprise",
              price: "199",
              features: [
                "All Professional Features",
                "24/7 Priority Support",
                "Custom Indicator Development",
                "Private Strategy Sessions",
                "API Access",
                "White-label Solutions"
              ]
            }
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-gray-800/50 rounded-xl p-8 ${
                plan.popular ? 'border-2 border-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full font-semibold transition-colors ${
                plan.popular
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Premium;
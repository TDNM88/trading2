import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What trading tools are available?",
    answer: "Our platform offers a comprehensive suite of trading tools including real-time analytics, advanced charting, automated trading systems, risk management tools, and market indicators."
  },
  {
    question: "How do I get started with trading?",
    answer: "Begin by creating an account, completing your profile, and exploring our tutorial section. We recommend starting with our 'Basics of Trading' course before moving to advanced features."
  },
  {
    question: "What are the subscription plans?",
    answer: "We offer three subscription tiers: Starter, Professional, and Enterprise. Each plan includes different features and tools to match your trading needs and experience level."
  },
  {
    question: "Is there a mobile app available?",
    answer: "Yes, our mobile app is available for both iOS and Android devices, allowing you to trade and monitor markets on the go with full platform functionality."
  },
  {
    question: "What support is available?",
    answer: "We provide 24/7 customer support through live chat, email, and phone. Premium members also get access to dedicated account managers and priority support."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-20 bg-[#0B1118]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-400">Find answers to common questions about our platform</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-blue-500 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
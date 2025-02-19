'use client'; // Enables interactivity

import { useState } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What services do you offer?',
      answer:
        'We offer home delivery, same-day delivery, express shipping, and scheduled deliveries.',
    },
    {
      question: 'What areas do you cover?',
      answer:
        'We provide services across [your service areas/cities]. Check our service coverage map for more details.',
    },
    {
      question: 'Do I need an account to use the service?',
      answer:
        'Yes, creating an account helps us manage your orders and provide real-time updates.',
    },
    {
      question: 'How do I place an order?',
      answer:
        'Simply log in to the app, select “New Delivery,” enter the pickup and delivery details, and confirm your order.',
    },
    {
      question: 'Can I schedule a delivery for a specific date and time?',
      answer:
        'Yes, we offer scheduled deliveries. You can select your preferred date and time during order placement.',
    },
    {
      question: 'How do I track my order?',
      answer:
        'You can track your delivery status in real-time via the “Track My Order” feature on the app.',
    },
    {
      question: 'How much does delivery cost?',
      answer:
        'Delivery costs depend on the package size, weight, and delivery distance. Pricing details are shown before confirming your order.',
    },
    {
      question: 'Can I cancel my order?',
      answer:
        'Yes, you can cancel your order if it hasn’t been picked up yet. Cancellation fees may apply.',
    },
    {
      question: 'How do refunds work?',
      answer:
        'Refunds will be processed for eligible cancellations within 3 business days.',
    },
    {
      question: 'What items are prohibited from shipping?',
      answer:
        'Items like hazardous materials, inflammable liquids, perishables, illegal substances, or fragile items may not be shipped.',
    },
    {
      question: 'How should I package my items?',
      answer:
        'Ensure items are securely packed to avoid damage during transit. Use bubble wrap or sturdy boxes when needed.',
    },
    {
      question: 'Are my items insured during transit?',
      answer:
        'Yes, we offer basic coverage for most shipments. Additional insurance options may be available.',
    },
    {
      question: 'What should I do if my package is lost or damaged?',
      answer:
        'Contact our support team immediately via the app or customer service hotline.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept credit/debit cards, digital wallets, and in-app payment methods.',
    },
    {
      question: 'Can I get an invoice for my order?',
      answer:
        'Yes, you can download your invoice from the order details page in the app.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg text-gray-600 text-center">
          Have questions? We’ve got answers.
        </p>

        {/* FAQ Accordion */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg shadow-md p-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              {/* Question */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <span className="text-gray-500 text-2xl">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>
              {/* Answer */}
              {activeIndex === index && (
                <p className="mt-2 text-gray-600 text-left">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


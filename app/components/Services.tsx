import Image from 'next/image';
import React from 'react';

export default function Services() {

  const steps = [
    {
      step: '1',
      title: 'home delivery',
      description:
        'We deliver your orders to the comfort of your destination address.',
      icon: '/home-icon.png', // Replace with an actual icon/image
    },
    {
      step: '2',
      title: 'timely delivery',
      description:
        'We deliver your orders quickly and without a hitch.',
      icon: '/byke-icon.png',
    },
    {
      step: '3',
      title: 'parcel safety',
      description:
        'Items are neatly packed and are delivered safely in good condition.',
      icon: '/parcel-delivery-icon.png',
    },
    {
      step: '4',
      title: 'order tracking',
      description:
        'Every customer can track the location of their orders in real time.',
      icon: '/location-icon.png',
    },
  ];

  return (
    <section id="services" className="bg-red-100 py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h1 className="capitalize text-3xl md:text-4xl font-extrabold text-gray-900">
          Our Services
        </h1>
        <p className="mt-4 text-lg font-medium text-gray-600 capitalize">
          let’s start send your package now.
        </p>

        {/* Steps */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index} style={{ marginBottom: '20px' }}
              className="flex flex-col items-center bg-white rounded-lg p-6 shadow-md hover:shadow-lg hover:scale-105 transition-transform animate-in slide-in-from-bottom duration-1000"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full text-2xl font-bold">
                <Image 
                  src={step.icon} 
                  width={50}
                  height={50}
                  alt={step.title} 
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 capitalize">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


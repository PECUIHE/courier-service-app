import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


export default function About() {  

  const features = [
    {
      id: '1',
      title: 'We serve you with full responsibility and convenience',
      description:
        'We are dedicated to give you a top-notch experience, ensuring your parcels are packed with care and delivered with customer’s satisfaction in mind.',
      image: '/allFeatures.png', // You can replace this with an actual image/icon
    },
    {
      id: 'reverse',
      title: 'highly accurate and secure location integration',
      description:
        'We deliver your package according to the destination address with very accurate location integration.',
      image: '/bus-delivery.png',
    },
    {
      id: '3',
      title: 'Easy to use with advanced supporting features',
      description:
        'Advanced features that we continually update and make it easier for you to send goods to various destinations.',
      image: '/customers-location.png',
    },
  ];

  return (
    <section id="about" className="bg-white py-16 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="capitalize text-3xl md:text-4xl font-extrabold text-gray-900">
          Why choose us?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          You need, We deliver. Your package will be delivered safely and still in good condition.
        </p>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-red-100  items-center justify-between rounded-lg p-6 shadow-md hover:shadow-lg hover:scale-105 transition-transform animate-in zoom-in duration-1000"
            >
              <h3 className="capitalize mt-4 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              {feature.id !== 'reverse' && (
              <div className='p-4 flex flex-row items-center justify-between gap-4'>  
                <div className="w-1/2 h-full">
                  <Image
                    src={feature.image}
                    width={500}
                    height={500}
                    alt={feature.title}
                  />
                </div>
                <div className='w-1/2'>
                  <p className="mt-2 text-gray-600 text-justify text-sm md:text-base">{feature.description}</p>
                </div>
              </div>
              )}
              {feature.id === 'reverse' && (
                <div className='p-4 flex flex-row-reverse items-center justify-between gap-4'>
                  <div className="w-1/2 h-full">
                    <Image
                      src={feature.image}
                      width={500}
                      height={500}
                      alt={feature.title}
                    />
                  </div>
                  <div className='w-1/2'>
                    <p className="mt-2 text-gray-600 text-justify text-sm md:text-base">{feature.description}</p>
                  </div>
                </div>
              )}
              
              <div className='mt-2 flex flex-row items-center justify-center gap-4'>
              <Link
                  href="/auth/signup"
                  className="bg-red-500 text-white px-4 py-2 rounded-md capitalize hover:bg-red-600"
                >
                  learn more
                </Link>
                <Link
                  href="/auth/login"
                  className="border-2 border-red-500 text-red-600 px-4 py-2 rounded-md capitalize hover:bg-red-100"
                >
                  Try it now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


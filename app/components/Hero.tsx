import React from 'react';
import Image from "next/image";
import Link from "next/link";
import delivery from "/public/hero-delivery.png";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-red-100 to-white py-16 lg:pt-24 lg:pb-16">
        <div className="pt-6">
            <h1 className="text-center uppercase text-lg md:text-3xl lg:text-5xl font-bold md:font-extrabold italic text-red-500 animate-pin duration-1000">
                safe and speedy delivery            
            </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4" >
            <div className="flex flex-col items-center justify-center pt-8 text-center">
                {/* Text Content */}
                <h2 className="capitalize italic animate-bounc text-2xl font-extrabold text-gray-900">
                    fastest  
                    <span className="text-red-500"> delivery </span> 
                     & easy 
                    <span className="text-red-500"> pickup</span>
                </h2>
                <h1 className="uppercase text-2xl md:text-4xl font-extrabold text-gray-900">
                    quick track your package
                </h1>
                
                <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                    During the whole pickup/delivery process, you will be notified of each stage of it in real time.
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                    <Link
                        href="/auth/signup"
                        className="bg-red-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-red-600"
                    >
                        Get Started
                    </Link>
                    <Link
                        href="#about"
                        className="text-red-500 px-6 py-3 rounded-md text-lg font-semibold border-2 border-red-500 hover:bg-red-100"
                    >
                        Learn More
                    </Link>
                </div>
            </div>

            <div>
                {/* Right side */}
                <div className="flex-shrink-0">
                    <Image
                        src={delivery}
                        alt="Delivery Mockup"
                        className=" cursor-pointer"
                    />
                </div>
            </div>
        </div>
    </section>
  );
}


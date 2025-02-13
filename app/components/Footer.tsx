import Image from 'next/image'
import Link from 'next/link'
import Logo from '/public/courier-logo.png';
import React from 'react'

export default function Footer() {
  return (
    <section className=' py-12 px-8 bg-red-100 text-gray-900'>
        <div className='container mx-auto'>
            <div className='footer-links flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="#">
                            <Image
                                src={Logo}
                                alt="Logo"
                                width={100}
                                height={100}
                                className="mb-4 cursor-pointer"
                            />
                        </Link>
                    </div>
                
                    <div className='flex flex-col  gap-1'>
                        <h1 className='font-semibold text-[18px] '>About Us</h1>
                        <ul>
                            <li>
                                <Link href="#about">About us</Link>
                            </li>
                            <li>
                                <Link href="#contact">Store location</Link>
                            </li>
                            <li>
                                <Link href="#contact">Contact</Link>
                            </li>
                            <li>
                                <Link href="#about">Orders tracking</Link>
                            </li>
                        </ul>
                    </div>

                    <div className='flex flex-col '>
                        <h1 className='font-semibold text-[18px]'>Useful Links</h1>
                        <ul>
                            <li>
                                <Link href="#">Returns</Link>
                            </li>
                            <li>
                                <Link href="#">Support Policy</Link>
                            </li>
                            <li>
                                <Link href="#">Site guidecy</Link>
                            </li>
                            <li>
                                <Link href="#faq">FAQs</Link>
                            </li>
                        </ul>

                    </div>

                    <div className='flex flex-col '>
                        <h1 className='font-semibold text-[18px]'>Follow Us</h1>
                        <ul>
                            <li>
                                <a href="https://www.matrikshub.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            </li>
                            <li>
                                <a href="https://www.matrikshub.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                            </li>
                            <li>
                                <a href="https://www.matrikshub.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                            </li>
                            <li>
                                <a href="https://www.matrikshub.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                            </li>
                        </ul>
                    </div>

                    <div className='flex flex-col '>
                        <h1 className='font-semibold text-[18px]'>Subscribe</h1>
                        <ul>
                            <div className=' lg:w-[75%] pt-1'>
                                <p>Get our weekly newsletters.</p>
                            </div>
                            
                            <form className='mt-2 flex gap-4'>
                                <input
                                    className='p-2'
                                    placeholder='Enter your email here.' 
                                />
                                <button 
                                    type='submit'
                                    className='bg-red-500 text-white font-semibold p-2 rounded-md'>
                                    SUBSCRIBE
                                </button>
                            </form>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}


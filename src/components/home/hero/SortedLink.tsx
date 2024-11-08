import Image from 'next/image'
import React from 'react'
import InputAction from './InputAction';
import LinkResult from '../linkResult/LinkResult';
export default function SortedLink() {

  

    return (
        <>
            <div className='py-10 w-full'>
                <LinkResult />
            </div>
            <div className='pb-10 w-full'>
                <div className=" gap-x-4 w-full grid xl:grid-cols-6 ">
                    <div className=" xl:col-span-3">
                        <Image
                            src="/images/shortLink/linkSuccess.png"
                            alt="Picture of the author"
                            width={800}
                            height={500}
                            style={{
                                borderRadius: '0.375rem',
                                width: '100%',
                                objectFit: 'cover',
                                top: 0,
                                left: 0,
                                height: "100%"
                            }}
                            priority
                        />
                    </div>
                    <div className=" xl:col-span-3 flex items-start justify-between flex-col  rounded-md">
                        <div>
                            <h1 className="text-dark  text-3xl md:text-4xl lg:text-3xl 2xl:text-5xl font-black drop-shadow-xl ">Short links, big results</h1>
                            <p className="text-dark mt-2 text-base md:text-lg   drop-shadow-xl">
                                A URL shortener built with powerful tools to help you grow and protect your brand.
                            </p>
                        </div>
                        <InputAction className={'bg-gray-200 '} />
                    </div>
                </div>
            </div>

        </>
    )
} 

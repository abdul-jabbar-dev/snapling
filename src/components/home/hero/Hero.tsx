import Image from 'next/image';
import React from 'react';
import InputAction from './InputAction';
export default function Hero() {
    return (
        <div className='py-10'>
            <div className="relative ">
                <div className="w-full xl:h-[600px] h-[460px]">
                    <Image
                        src="/images/HeroBG.png"
                        alt="Picture of the author"
                        fill
                        style={{
                            borderRadius: '0.375rem',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                        priority
                    />
                </div>
                <div className=" absolute top-1/2  transform flex items-start flex-col  -translate-y-1/2 p-8 w-full md:w-auto rounded-md">
                    <h1 className="text-white  text-3xl md:text-4xl lg:text-6xl font-black drop-shadow-xl ">Short links, big results</h1>
                    <p className="text-white mt-2  mb-9  text-base md:text-lg lg:text-2xl  drop-shadow-xl">
                        A URL shortener built with powerful tools to help you grow and protect your brand.
                    </p>
                    <span className='xl:w-[500px]'> <InputAction /></span>
                </div>
            </div>
        </div>
    );
}

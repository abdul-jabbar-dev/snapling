import React from 'react'
import BenefitCard from './BenefitCard'

export default function Benefit() {
    const benefits = [
        { src: '/images/shortLink/benefit/benefit1.png', title: 'Unrivaled insights', desc: "Understand your audience with detailed analytics on your links." },
        { src: '/images/shortLink/benefit/benefit2.png', title: 'Built-in security', desc: "Safeguard your brand from malicious URLs and phishing attacks." },
        { src: '/images/shortLink/benefit/benefit3.png', title: 'Smart targeting', desc: "Deliver the right message to the right people with retargeting pixels." },
        { src: '/images/shortLink/benefit/benefit4.png', title: 'Seamless experience', desc: "Easily create QR codes for your links, and quickly share them with friends or customers." },
    ]
    return (
        <div className='mt-12'>
            <div>
                <h1 className='text-4xl font-extrabold text-dark'>Why snapling?</h1>
                <p className='pt-3 2xl:w-3/4 text-fontGray'>Our URL snapling is designed to help you get more out of every link. Whether you&rsquo;re sharing content, running ads, or building a brand, we&#39;ve got the tools you need to succeed.</p>
            </div>
            <div className='flex w-full justify-between gap-x-4 py-8'>
                {benefits.map((item, i) => <BenefitCard key={i} item={item} />)}
            </div>
        </div>
    )
}

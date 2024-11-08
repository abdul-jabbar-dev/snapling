import Image from 'next/image';
import React from 'react';

type TItem = { src: string; desc: string; title: string };

interface BenefitCardProps {
    item: TItem;
}

export default function BenefitCard({ item }: BenefitCardProps) {
    return (
        <div className="w-1/2">
            <div className="w-full">
                <Image
                    className="rounded-md"
                    alt={item.title}
                    src={item.src}
                    style={{ width: "100%", height: '160px' }}
                    width={266}
                    height={128}

                />
            </div>
            <div>
                <h2 className="mt-3 text-lg">{item.title}</h2>
                <p className="text-fontGray">{item.desc}</p>
            </div>
        </div>
    );
}

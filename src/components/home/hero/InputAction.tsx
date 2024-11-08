'use client'
import { addLink } from '@/lib/redux/features/shortLink/link';
import { useAppDispatch } from '@/lib/redux/hooks/reduxHooks';
import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";

interface Params {
    className?: string;
}

export default function InputAction({ className }: Params) {
    const dispatch = useAppDispatch()
    const [link, setLink] = useState('');


    const processLink = async () => {
        if (link) {
            dispatch(addLink(link))
        }
    };

    return (
        <div className="w-full">
            <div className="relative">
                <CiSearch className='absolute font-extralight w-6 h-6 left-2 top-4' />
                <input
                    onChange={(e) => setLink(e.target.value)}
                    type="text"
                    placeholder="Enter URL"
                    className={"p-4 px-10 pe-28 rounded w-full outline-none " + className}
                />
                <button onClick={processLink} className="py-2 px-3 bg-primary text-dark font-semibold rounded absolute right-2 top-2">
                    Shorten
                </button>
            </div>

        </div>
    );
}

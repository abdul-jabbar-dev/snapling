import { Spinner } from '@/components/ui/spinner';
import React, { useEffect, useState } from 'react';
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

type TSteps = {
    id: number;
    step: string;
    icon: JSX.Element;
    name: string;
    desc: string;
    status: string;
    error?: string;
};

export default function LinkValidation({ steps }: { steps: { name: string, status: string, error?: string }[] }) {
    const initialSteps: TSteps[] = [
        { id: 1, step: 'URL Syntax Validation', name: 'Syntax Validation', icon: <BsThreeDots />, desc: 'Check if the URL is correctly formatted.', status: 'starting' },
        { id: 2, step: 'Domain Verification', name: 'DNS Lookup', icon: <BsThreeDots />, desc: 'Verify the legitimacy of the domain.', status: 'starting' },
        { id: 3, step: 'Website Availability Check', name: 'HTTP Check', icon: <BsThreeDots />, desc: 'Ensure the website is reachable.', status: 'starting' },
        { id: 4, step: 'Spam and Malware Detection', name: 'Spam Check', icon: <BsThreeDots />, desc: 'Check for known spam and malware.', status: 'starting' },
    ];

    const [uiSteps, setUiSteps] = useState<TSteps[]>(initialSteps);

    useEffect(() => {
        const updatedSteps = initialSteps.map(step => {
            const matchedStep = steps.find(s => s.name === step.name);
            if (matchedStep) {
                const icon = matchedStep.status === "success"
                    ? <FaRegCircleCheck />
                    : matchedStep.status === "error"
                        ? <MdErrorOutline />
                        : matchedStep.status === "process"
                            ? <Spinner size="small" />
                            : <BsThreeDots />;
                return { ...step, status: matchedStep.status, error: matchedStep.error, icon };
            }
            return step;
        });
        setUiSteps(updatedSteps);
    }, [steps]);

    const statusColors: { [key: string]: string } = {
        success: 'text-green-500',
        error: 'text-red-500',
        process: 'text-gray-500',
        starting: 'text-gray-500',
    };

    return (
        <div className="w-full">
            <h1 className="text-[#141C24] tracking-light text-lg font-bold leading-tight px-4 pb-3 pt-6">Track the Verification Process</h1>
            <div className="px-2">
                {uiSteps.map(({ id, step, desc, status, icon }) => (
                    <div key={id} className="flex items-center justify-between gap-x-2 pb-2">
                        <div>
                            <h1 className="font-semibold text-dark">{step}</h1>
                            <p className="text-fontGray text-sm">{desc}</p>
                        </div>
                        <span className={statusColors[status] || 'text-gray-500'}>
                            {icon}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

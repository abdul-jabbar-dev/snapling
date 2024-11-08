'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useEffect, useState, useCallback } from 'react';
import { LuClipboardCopy } from "react-icons/lu";
import { toast } from "sonner";
import LinkValidation from "./LinkValidation";
import { useCreate_shortURLMutation } from "@/lib/redux/features/shortLink/link";
import { useAppSelector } from "@/lib/redux/hooks/reduxHooks";
import { Spinner } from "@/components/ui/spinner";

function CopyableLink({ url, label }: { url: string, label: string }) {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(url);
    toast(`${label} copied to clipboard!`);
  }, [url, label]);

  return (
    <div className="mb-4 w-full">
      <div className="text-fontGray flex items-center gap-x-2">
        <span className="break-words">{label}</span>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <LuClipboardCopy
                className="hover:text-blue-500 cursor-pointer"
                onClick={handleCopy}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <h3 className="text-dark font-semibold px-2 break-words">
        <a className="focus:text-blue-950 active:text-blue-950 text-primary hover:underline" href={url} target="_blank">{url}</a>
      </h3>
    </div>
  );
}

export default function LinkResult() {
  const link = useAppSelector(state => state.link_slice.link);
  const [createShortURL] = useCreate_shortURLMutation();
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [shortLink, setShortLink] = useState('');

  const [steps, setSteps] = useState([
    { name: "Syntax Validation", status: "starting", error: '' },
    { name: "DNS Lookup", status: "starting", error: '' },
    { name: "HTTP Check", status: "starting", error: '' },
    { name: "Spam Check", status: "starting", error: '' }
  ]);

  const verifyLink = useCallback(async () => {
    if (link) {
      const res = await createShortURL({ originalUrl: link });
      if (res.data) {
        setVerificationId(res.data.verificationId);
      }
    }
  }, [link, createShortURL]);

  useEffect(() => {
    setGlobalError(null)
    setShortLink('')
    setVerificationId(null)
    verifyLink();
    setSteps([
      { name: "Syntax Validation", status: "starting", error: '' },
      { name: "DNS Lookup", status: "starting", error: '' },
      { name: "HTTP Check", status: "starting", error: '' },
      { name: "Spam Check", status: "starting", error: '' }
    ])
  }, [verifyLink]);

  useEffect(() => {
    if (!verificationId || !link) return;

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/link/verify-status/${verificationId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const statusData: { status: string, step: string, error?: string, shortUrl?: string } = JSON.parse(event.data);

        if (statusData.status === 'completed' && statusData.shortUrl) {
          setShortLink(statusData.shortUrl);
          eventSource.close();
        } else {
          setSteps(prevSteps => prevSteps.map(step =>
            step.name === statusData.step
              ? { ...step, status: statusData.error ? 'error' : statusData.status, error: statusData.error || '' }
              : step
          ));

          if (statusData.step === 'Syntax Validation' && statusData.error) {
            setGlobalError(statusData.error);
          }
        }
      } catch (err) {
        eventSource.close();
        setGlobalError(err instanceof Error ? err.message : 'Failed to handle server URL! Try again');
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    eventSource.onerror = (err) => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [verificationId, link]);

  const shortenedLink = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${shortLink}`;

  return (
    <div className="flex lg:flex-row flex-col w-full gap-x-6 mb-4">
      <div className="lg:w-1/2 w-full">
        <LinkValidation steps={steps} />
      </div>
      <div className="break-words lg:w-1/2 w-full">
        {globalError ? (
          <h1 className="text-[#ff4646] tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">{globalError}</h1>
        ) : !shortLink ? (
          <>
            <h1 className="text-[#141C24] tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">You’re all set!</h1>
            <p className="text-[#141C24] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Your link has been shortened and is ready to use. Copy the new link or share it anywhere.
            </p>
            <CopyableLink url={link} label="Original URL" />
            <CopyableLink url={shortenedLink} label="Shortened URL" />
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

'use client'
import { Toaster } from '@/components/ui/sonner'
import React from 'react'

export default function ClientSideProvider ({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children }
            <Toaster />
        </>
    )
}

import { Button } from 'src/components/UI/Button'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { APP_NAME, STATIC_ASSETS_URL } from '@/constants'

export default function Custom404() {
    return (
        <>
            <Head>
                <title>404</title>
            </Head>
            <div className="flex flex-col items-center justify-start h-full mt-10 md:mt-20">
                <img
                    src={`${STATIC_ASSETS_URL}/images/icon.png`}
                    alt={APP_NAME}
                    draggable={false}
                    height={200}
                    width={200}
                />
                <div className="py-10 text-center">
                    <h1 className="mb-4 text-3xl font-bold">404</h1>
                    <div className="mb-6">This page could not be found.</div>
                    <Link href="/">
                        <Button>Go Home</Button>
                    </Link>
                </div>
            </div>
        </> 
    )
}
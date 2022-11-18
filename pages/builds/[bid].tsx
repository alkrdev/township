import Head from "next/head";
import React, { useEffect, useState } from "react"; 
import { useRouter } from 'next/router'

import { Build } from "../../interfaces/Build";
import Link from "next/link";

const Build = () => {
    const [data, setData] = useState<Build>()
    
    const router = useRouter()
    const { bid } = router.query
  
    useEffect(() => {
        if (bid !== undefined) {
            fetch("/api/builds/" + bid)
                .then(res => res.json())
                .then(data => {
                    setData(data)
                })
        }
    }, [bid])

    useEffect(() => {
       console.log(data)
    }, [data])

    return (       
        <div className="p-10">
            <Head>
                <title>Township Building Setups</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex items-center min-h-[90vh] flex-col">
                {data !== undefined && <>
                    <div className="flex flex-row">
                        <Link href="/">
                        <button className="inline-flex items-center px-4 py-2 bg-green-400 hover:bg-green-600 text-gray-800 text-sm font-medium rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>

                            Back
                        </button>
                        </Link>
                        <div className="mx-5 text-xl">Build Title: {data.BuildTitle}</div>
                        <div className="mx-5 text-xl">Map: {data.Map}</div>
                        <div className="mx-5 text-xl">Worship: {data.Worship}</div>
                    </div>
                    <div className="flex flex-col justify-start divide-y w-full">
                        {data.Areas.map((area, index) => {
                            return (
                                <div className="p-4" key={index}>
                                    <div className="text-xl">{area.Name}</div>
                                    {area.Buildings.map((building, index) => {
                                        return (
                                            <div key={index}>Type: {building.Type} | Amount: {building.Amount} | Tier: {building.Tier}</div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </>}
            </main>

            <footer className="flex justify-center items-center p-2 border-t-2 border-t-white border-solid">
                Credits go to Spitzer#3603 (Discord)
            </footer>
        </div>
    );
}

export default Build;
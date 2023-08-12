import Head from "next/head";
import React, { useEffect, useState } from "react"; 
import { useRouter } from 'next/router'
import Link from "next/link";

import { Build } from "../../interfaces/Build";
import { Series } from "../../interfaces/Series";

const Build = () => {
    const [series, setSeries] = useState<Series>()
    
    const router = useRouter()
    const { bid } = router.query
  
    useEffect(() => {
        if (bid !== undefined) {
            fetch("/api/series/" + bid)
                .then(res => res.json())
                .then(data => {
                    setSeries(data)
                })
        }
    }, [bid])

    return (       
        <div className="p-10">
            <Head>
                <title>Township Building Setups</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex items-center min-h-[90vh] flex-col">                
                <div className="grid items-center grid-cols-3 gap-5 mt-4">
                {series.length !== 0 && series.map((build, index) => {
                    return (
                    <Link href={"/series/" + index} key={index} className="border-2 border-green-600 rounded-lg px-3 py-2 select-none text-green-400 cursor-pointer hover:bg-green-600 hover:text-green-200 min-w-fit">
                        {build.BuildTitle}
                    </Link>
                    )
                })}
                </div>
            </main>

            <footer className="flex justify-center items-center p-2 border-t-2 border-t-white border-solid">
                Credits go to Spitzer#3603 (Discord)
            </footer>
        </div>
    );
}

export default Build;
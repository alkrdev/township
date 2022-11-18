import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Build } from "./../interfaces/Build"

export default function Home() {
  const [data, setData] = useState<Build[]>([])

  useEffect(() => {
    fetch("/api/builds")
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
  }, [])

  return (
    <div className="p-10">
      <Head>
        <title>Township Building Setups</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center min-h-[90vh] flex-col">
        <h5>Select a build to show</h5>
        <div className="grid items-center grid-cols-3 gap-5 mt-4">
          {data.length !== 0 && data.map((build, index) => {
            return (
              <Link href={"/builds/" + index} key={index} className="border-2 border-green-600 rounded-lg px-3 py-2 select-none text-green-400 cursor-pointer hover:bg-green-600 hover:text-green-200 min-w-fit">
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
  )
}

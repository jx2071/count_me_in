"use client";
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/logo.png"
          alt="Count Me In Logo"
          width={360}
          height={80}
          priority
        />
      </div>

      <div className="mb-32 text-center">
      <h2 className={`max-w-[30ch] text-xl opacity-50`}>A Platform for people around the neighbourhood to gather around</h2>
      <button className="mt-4 p-3 rounded-full font-bold text-white text-xl bg-sky-300 transition duration-150 hover:bg-amber-200 hover:text-sky-300"
      onClick={() => window.location.href = "/discover"}
      >
        Start Exploring</button>
      </div>
    </div>
  )
}

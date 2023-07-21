import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'

export default function NotFound() {
return(
    <body className="bg-white">
      <Navbar />
        <main className="flex min-h-fit flex-col items-center justify-between p-24 mt-40">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="mt-4 p-3 rounded-full font-bold text-white text-xl bg-sky-300 transition duration-150 hover:bg-amber-200 hover:text-sky-300"
            >
              Go back home
            </a>
          </div>
        </main>
      </body>

  );
}

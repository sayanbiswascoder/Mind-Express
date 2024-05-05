import React from 'react'
import Link from 'next/link'

const Notfound = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-cyan-500">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white">404</h1>
        <p className="text-2xl font-light text-cyan-100">Page not found</p>
        <p className="mt-4 text-lg font-light text-cyan-100">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href={`/`} className="mt-6 px-6 py-2 text-cyan-500 bg-white rounded shadow hover:bg-cyan-100">
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default Notfound
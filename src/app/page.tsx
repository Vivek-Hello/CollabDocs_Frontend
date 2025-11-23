'use client'
import Link from "next/link";
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 via-purple-800 to-gray-900 text-white font-mono">
      <Toaster  position="top-right"
  reverseOrder={false}
  gutter={8}/>
      <div className="bg-zinc-900/90 rounded-3xl border border-zinc-700 shadow-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🚀 CollabDocs
        </h1>
        <p className="mb-6 text-lg text-gray-300">
          A real-time collaborative document platform. Edit, share, and manage docs with your team anywhere!
        </p>
        <div className="flex flex-col gap-4 mb-6">
          <Link href="/signup" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold transition duration-200">
            Get Started
          </Link>
          <Link href="/login" className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 font-semibold transition duration-200">
            Login
          </Link>
        </div>
        <div className="text-xs text-gray-400">
          <span>
            Made with <span className="text-pink-400">Socket.IO</span>, <span className="text-blue-400">ReactQuill</span> & Next.js
          </span>
        </div>
      </div>
    </div>
  );
}

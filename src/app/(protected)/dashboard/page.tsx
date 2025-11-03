"use client"
import DocsList from '@/components/DocsList'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-zinc-900 via-gray-900 to-zinc-800 text-white font-mono'>
      <Navbar />
      
      {/* Header Section with Add Button */}
      <div className='flex items-center justify-between p-8 px-10'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
            My Documents
          </h1>
          <p className='text-gray-400 text-sm'>Create and manage your documents</p>
        </div>
        
        <div className='flex items-center gap-4'>
          <span className='text-lg text-gray-300'>New Document</span>
          <button 
            className='flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 
                      hover:from-green-600 hover:to-emerald-600 text-2xl font-bold shadow-lg
                      transition-all duration-200 transform hover:scale-110 active:scale-95
                      hover:shadow-xl'
          >
            +
          </button>
        </div>
      </div>

      {/* Documents List Section */}
      <div className='p-8 pt-4'>
        <DocsList/>
      </div>
    </div>
  )
}

export default page
"use client"
import DocsList from '@/components/DocsList'
import Navbar from '@/components/Navbar'
import React from 'react'


 
const page = () => {
 
  return (
    <div className='text-white'>
      <Navbar />
      <div className='flex items-center justify-end gap-4 p-10  font-mono'>
          <span className='text-2xl'>Add</span>
          <button className='flex items-center justify-center p-4 hover  = async () => {
            
          }
           rounded-full bg-green-500 text-2xl ' >+</button>
      </div>
      <DocsList/>
    </div>
  )
}

export default page
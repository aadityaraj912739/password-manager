import React from 'react'
import gitHumImage from '../assets/gitHubImage.jpg'
const Navbar = () => {
  return (
    <div>
      <nav className='bg-slate-900 text-black flex justify-between items-center px-4 h-16 font-bold text-white'>
        <div>
          <span className='text-green-700 font-bold'>&lt;</span>
          <span className='text-white'>Pass<span className='text-green-700 font-bold'>OP</span></span>
          <span className='text-green-700 font-bold'>&gt;</span>
        </div>
        <ul className='flex gap-4'>
          <li className='flex gap-4'>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        <a href="https://github.com/aadityaraj912739" target="_blank" rel="noopener noreferrer">
          <button className="flex items-center justify-center p-2 rounded-full bg-green-400 hover:bg-green-700 transition">

            <img
              src={gitHumImage}
              alt="GitHub"
              className="w-8 h-8 object-contain"
            />

            <span className="ml-2 text-white">GitHub</span>
          </button>
        </a>

      </nav>
    </div>
  )
}

export default Navbar

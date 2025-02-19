import React from 'react'

const Navbar = () => {
  return (
    <div >
      <nav className='flex bg-slate-600 justify-between mx-auto py-3 '>
        <div>
          <span className='font-bold text-3xl text-white cursor-pointer mx-9'>iTask</span>
        </div>
        <ul className='flex text-white gap-7  mx-9 '>
            <li className='hover:font-bold cursor-pointer transition-all'>Home</li>
            <li hover:font-bold cursor-pointer transition-all>Your todos</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar

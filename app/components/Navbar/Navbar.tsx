import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from "../../../assets/logo.png"
const Navbar = () => {
  return (
    <div>
        <nav className='bg-green sticky w-screen h-[80px] shadow-md'>
            <div className='flex justify-start gap-14 px-5 items-center  h-full w-full'>
                <Link href='deep'><Image src={Logo} alt='Logo' height="50" width="120" className='rounded-md cursor-pointer' priority/></Link>
                <div className='flex justify-around w-full'>
                    <Link href="/">Home</Link>
                    <Link href="/Integrate">About</Link>
                    <Link href="/">Clients</Link>
                    <Link href="/">Contact Us</Link>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar

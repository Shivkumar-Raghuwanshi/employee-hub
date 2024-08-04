'use client'

import Link from 'next/link'
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import { Button } from './ui/button'
import { UserCircle, LogOut, LogIn } from 'lucide-react'

export default function Navbar() {
  const { isSignedIn, user } = useUser()

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <svg className="h-8 w-8 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C22.9986 17.1771 21.7011 15.5857 19.91 15.1375" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 7.13C21.7699 7.58317 23.0078 9.17879 23 11C23 12.8638 21.7252 14.4299 20 14.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-semibold tracking-wide">Employee Hub</span>
          </Link>
          <div className="flex items-center">
            {isSignedIn ? (
              <>
                <div className="hidden md:flex items-center mr-4">
                  <UserCircle className="h-6 w-6 mr-2 text-blue-200" />
                  <span className="font-medium text-blue-100">
                    Welcome, {user.firstName}!
                  </span>
                </div>
                <SignOutButton>
                  <Button variant="outline" className="text-black border-white hover:bg-blue-700 hover:text-white transition-colors duration-300">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="outline" className="text-black border-white hover:bg-blue-700 hover:text-white transition-colors duration-300">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
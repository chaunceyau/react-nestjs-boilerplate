import * as React from 'react'

import { Link } from '@reach/router'

export interface INavigationProps {
  // user: any
}

export function Navigation(props: INavigationProps) {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-red-600 px-6 py-4">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          🚀&nbsp;&nbsp;Boilerplate
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-red-200 border-red-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            to="/account/details"
            className="block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white mr-4 lg:hidden"
          >
            Dashboard
          </Link>
          <Link
            to="/account/subscription"
            className="block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white mr-4 lg:hidden"
          >
            Checkout
          </Link>
        </div>
        <div>
          <Link
            to="/account"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-500 hover:bg-white mt-4 lg:mt-0"
          >
            My Account
          </Link>
        </div>
      </div>
    </nav>
  )
}

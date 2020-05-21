import React from 'react'
import { Pay } from './pay'

export function Checkout(props: { path: string }) {
  return (
    <div className="bg-gray-500 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-xs h-full" style={{ minWidth: 425 }}>
        <h1 className="text-lg text-white mb-6 text-center">Provide Payment</h1>
        <div className="mb-10">
          <Pay />
        </div>
      </div>
    </div>
  )
}

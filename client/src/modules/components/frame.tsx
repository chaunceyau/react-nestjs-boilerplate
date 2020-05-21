import React from 'react'
//
import { SidebarNavigation } from './sidebar-navigation'

interface FrameProps {
  path: string
  children: React.ReactNode
}

export function Frame(props: FrameProps) {
  return (
    <div className="bg-gray-100 pt-6 h-screen-minus-nav">
      <div className="px-6 lg:px-10 flex global-max-width">
        <SidebarNavigation />
        <div className="w-full flex-1 lg:ml-12">{props.children}</div>
      </div>
    </div>
  )
}

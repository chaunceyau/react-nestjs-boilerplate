import React from 'react'
import { Link, useLocation } from '@reach/router'

interface MenuItemProps {
  marginBottom?: boolean
  active?: boolean
  title: string
  icon: React.ReactNode
  to: string
}

export function MenuItem(props: MenuItemProps) {
  //   const location = useLocation()
  //   if (location.pathname === props.to)
  if (props.active)
    return (
      <div
        className={`flex items-center menu-item-active-sidebar ${props.marginBottom &&
          'mb-3'}`}
      >
        {props.icon}
        <Link className="text-red-500 font-semibold ml-2" to={props.to} >
          {props.title}
        </Link>
      </div>
    )
  return (
    <div className={`flex items-center ${props.marginBottom && 'mb-3'}`}>
      {props.icon}
      <Link className="text-gray-500 ml-2" to={props.to}>
        {props.title}
      </Link>
    </div>
  )
}

// const MenuMap = {
//     '/account/details':
// }

import React from 'react'
//
import { MenuItem } from './menu-item'
import { useLocation } from '@reach/router'

interface SidebarNavigationProps {
  path?: string
  children?: React.ReactNode
}

export function SidebarNavigation(props: SidebarNavigationProps) {
  const location = useLocation()
  return (
    <div className="flex flex-col hidden lg:block">
      <MenuItem
        marginBottom
        active={location.pathname === '/account'}
        to="/account"
        title="Dashboard"
        icon={
          <DashboardIcon
            active={location.pathname === '/account'}
          />
        }
      />
      <MenuItem
        marginBottom
        active={location.pathname === '/account/subscription'}
        to="/account/subscription"
        title="Subscription"
        icon={
          <SubscriptionIcon
            active={location.pathname === '/account/subscription'}
          />
        }
      />
      <MenuItem
        marginBottom
        active={location.pathname === '/account/details'}
        to="/account/details"
        title="Personal Details"
        icon={
          <PersonalDetailsIcon
            active={location.pathname === '/account/details'}
          />
        }
      />
    </div>
  )
}

const SubscriptionIcon = (props: { active?: boolean }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="far"
    data-icon="credit-card"
    height={14}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
  >
    <path
      fill={props.active ? '#f56565' : 'grey'}
      d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
    />
  </svg>
)

const PersonalDetailsIcon = (props: { active?: boolean }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="user-circle"
    height={14}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 496 512"
  >
    <path
      fill={props.active ? '#f56565' : 'grey'}
      d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
    />
  </svg>
)

const DashboardIcon = (props: { active?: boolean }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="home"
    role="img"
    height={14}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
  >
    <path
      fill={props.active ? '#f56565' : 'grey'}
      d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
    />
  </svg>
)

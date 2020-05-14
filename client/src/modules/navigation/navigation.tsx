import * as React from 'react'

import { Link } from '@reach/router'
import { useAuth } from '../context/auth-context'

export interface INavigationProps {
  user: any
}

export function Navigation(props: INavigationProps) {
  return (
    <div>
      <h1>Boilerplate :)</h1>
    </div>
  )
}

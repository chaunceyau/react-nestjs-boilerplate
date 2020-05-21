import React from 'react'
import { RouteComponentProps } from '@reach/router'

interface Authenticated404Props extends RouteComponentProps {
  default: boolean
}
export function Authenticated404(props: Authenticated404Props) {
  return <span>404 page - auth route - not found</span>
}

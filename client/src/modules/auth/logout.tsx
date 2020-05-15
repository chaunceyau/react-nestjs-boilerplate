import React from 'react'
import { useNavigate } from '@reach/router'
//
import * as authClient from '../auth/auth-client'
import { useAuth } from '../context/auth-context'

export default function Logout(props: any) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    // authClient.logout()
    logout()
  }, [])

  return <div>loggging out...</div>
}

import * as React from 'react'
import { Link, useNavigate } from '@reach/router'
import { useForm } from 'react-hook-form'

import { useAuth } from '../context/auth-context'
import { TextInput } from '../components/text-input'

export interface ILoginProps {
  path?: string
  default?: boolean
}

export default class Login extends React.PureComponent<ILoginProps> {
  render() {
    return (
      <div>
        <LoginForm />
      </div>
    )
  }
}

function LoginForm() {
  const auth = useAuth()
  const navigate = useNavigate()
  // TODO: refactor login function to be hook...
  const [mutationError, setMutationError] = React.useState()

  const { register, handleSubmit } = useForm()

  async function onSubmit({ email, password }: any, other: any) {
    try {
      // TODO: refactor login function to be hook...
      await auth.login({ email, password }).then(() => navigate('/dashboard'))
    } catch (err) {
      console.log(err)
      setMutationError(err)
    }
  }
  return (
    <div className="bg-gray-500 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-xs h-full">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset disabled={false}>
            <TextInput
              register={register}
              title="email"
              placeholder="example@test.com"
              error={null}
              wrapperClasses="mb-4"
            />
            <TextInput
              register={register}
              title="password"
              placeholder="*******"
              error={{ message: 'you fucked up' }}
              wrapperClasses="mb-4"
            />
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </fieldset>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  )
}

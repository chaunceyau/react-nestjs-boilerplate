import * as React from 'react'
import { Link, useNavigate } from '@reach/router'
import { useForm } from 'react-hook-form'

import { useAuth } from '../context/auth-context'
import { TextInput } from '../components/text-input'
import { Trees } from '../components/trees'

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
      await auth.login({ email, password }).then(() => navigate('/account'))
    } catch (err) {
      console.log(err)
      setMutationError(err)
    }
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="bg-gray-200 px-10 pt-6 flex flex-col justify-between">
        <h1 className="text-2xl font-bold text-red-600">🚀 Boilerplate</h1>
        <Trees />
      </div>
      <div className="p-10 md:pb-40 flex flex-col items-center justify-center">
        <div className="w-full md:w-2/3">
          <span className="text-2xl mb-4 block">Login</span>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                error={null}
                wrapperClasses="mb-4"
              />
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
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
        </div>
      </div>
    </div>
  )
}

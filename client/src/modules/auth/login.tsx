import * as React from 'react'
import { Link, useNavigate } from '@reach/router'
import { useForm } from 'react-hook-form'

import { useAuth } from '../context/auth-context'

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
    <div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    {/* <img
                      alt="Boilerplate Logo"
                      src={require('../../assets/boilerplate_logo.png')}
                      className="avatar img-fluid"
                      style={{ height: 80 }}
                    /> */}
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset disabled={false}>
                      <div>
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter your email"
                          ref={register}
                        />
                      </div>
                      <div>
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter your password"
                          ref={register}
                        />
                      </div>
                      {/* {mutationError && (
                        <div className="row">
                          {mutationError?.graphQLErrors?.map((error: any) => {
                            return (
                              <p className="text-danger px-4">
                                {error.message}
                              </p>
                            )
                          })}
                        </div>
                      )} */}
                      <div>
                        <div>
                          <button type="submit">Login</button>
                        </div>
                        <div>
                          <Link to="/">Forgot Password?</Link>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <small>© 2020 Application, Inc. All rights reserved.</small>
        </div>
      </div>
    </div>
  )
}

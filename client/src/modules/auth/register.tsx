import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from '@reach/router'
//
import { useRegistration } from '../auth/auth-client'

export interface IRegisterProps {
  path: string
}

export default class Register extends React.PureComponent<IRegisterProps> {
  render() {
    return (
      <div>
        <RegisterForm />
      </div>
    )
  }
}

function RegisterForm() {
  const navigate = useNavigate()

  const { registerMutation, loading, error } = useRegistration()
  const { register, handleSubmit } = useForm()

  async function onSubmit({ email, password }: any, other: any) {
    try {
      registerMutation({ variables: { email, password } }).then(data =>
        navigate('/auth/login')
      )
    } catch (err) {
      console.log(err)
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
                      src={require('../../assets/Boilerplate_logo.png')}
                      "
                      style={{ height: 80 }}
                    /> */}
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset disabled={loading}>
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
                          minLength={6}
                          id="password"
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          ref={register}
                        />
                      </div>
                      <div>
                        <label htmlFor="confirm_password">
                          Confirm Password
                        </label>
                        <input
                          minLength={6}
                          type="password"
                          id="confirm_password"
                          name="confirm_password"
                          placeholder="Confirm your password"
                          ref={register}
                        />
                      </div>
                      {error && (
                        <div>
                          {error.graphQLErrors.map(error => {
                            return <p>{error.message}</p>
                          })}
                        </div>
                      )}
                      <button type="submit">Register</button>
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

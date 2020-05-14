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
      <div className="bg-light login-form-container d-flex align-items-center">
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
    <div className="container mb-5">
      <div className="row mb-2">
        <div className="col-md-12 d-flex flex-column justify-content-center">
          <div className="row">
            <div className="mx-auto login-form-width">
              <div className="card rounded shadow shadow-sm">
                <div className="card-body p-4">
                  <div className="pl-4 pr-4 pb-4 pt-2 text-center">
                    {/* <img
                      alt="Boilerplate Logo"
                      src={require('../../assets/Boilerplate_logo.png')}
                      className="avatar img-fluid"
                      style={{ height: 80 }}
                    /> */}
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset disabled={loading}>
                      <div className="form-group">
                        <label htmlFor="email" className="font-weight-bold">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control shadow-sm"
                          placeholder="Enter your email"
                          ref={register}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="password" className="font-weight-bold">
                          Password
                        </label>
                        <input
                          minLength={6}
                          id="password"
                          type="password"
                          name="password"
                          className="form-control shadow-sm"
                          placeholder="Enter your password"
                          ref={register}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label
                          htmlFor="confirm_password"
                          className="font-weight-bold"
                        >
                          Confirm Password
                        </label>
                        <input
                          minLength={6}
                          type="password"
                          id="confirm_password"
                          name="confirm_password"
                          className="form-control shadow-sm"
                          placeholder="Confirm your password"
                          ref={register}
                        />
                      </div>
                      {error && (
                        <div className="row">
                          {error.graphQLErrors.map(error => {
                            return (
                              <p className="text-danger px-4">
                                {error.message}
                              </p>
                            )
                          })}
                        </div>
                      )}
                      <button type="submit" className="btn btn-primary w-100">
                        Register
                      </button>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <small className="text-secondary">
            © 2020 Application, Inc. All rights reserved.
          </small>
        </div>
      </div>
    </div>
  )
}

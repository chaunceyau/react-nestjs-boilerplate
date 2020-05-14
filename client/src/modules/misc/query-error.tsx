import * as React from 'react'

export interface IQueryErrorProps {}

export function QueryError(props: IQueryErrorProps) {
  return (
    <div className="d-flex flex-column">
      <img
        src={require('../../assets/bug-fixing.svg')}
        alt=""
        className="py-5"
        style={{ maxHeight: 350, width: 'auto' }}
      />
      <div
        className="alert alert-danger text-center mx-auto px-5 mt-3"
        role="alert"
      >
        <span>
          An unexpected issue occured. Please try again or contact support.
        </span>
      </div>
    </div>
  )
}

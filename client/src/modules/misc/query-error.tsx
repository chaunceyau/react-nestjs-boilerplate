import * as React from 'react'

export interface IQueryErrorProps {}

export function QueryError(props: IQueryErrorProps) {
  return (
    <div>
      <img
        src={require('../../assets/bug-fixing.svg')}
        alt=""
        style={{ maxHeight: 350, width: 'auto' }}
      />
      <div role="alert">
        <span>
          An unexpected issue occured. Please try again or contact support.
        </span>
      </div>
    </div>
  )
}

import * as React from 'react'

export interface ILoadingIndicatorProps {}

export function LoadingIndicator(props: ILoadingIndicatorProps) {
  return (
    <div
      className="d-flex justify-content-center align-items-center w-100"
      style={{ minHeight: '80vh' }}
    >
      <div className="spinner-grow text-primary mr-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-primary mr-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

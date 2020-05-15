import * as React from 'react'

export interface ILoadingIndicatorProps {}

export function LoadingIndicator(props: ILoadingIndicatorProps) {
  return (
    <div>
      <div role="status">
        <span>Loading...</span>
      </div>
      <div role="status">
        <span>Loading...</span>
      </div>
      <div role="status">
        <span>Loading...</span>
      </div>
    </div>
  )
}

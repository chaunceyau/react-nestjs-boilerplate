import * as React from 'react'
import { FullPageLoading } from '../components/full-page-loading'

export interface ILoadingIndicatorProps {}

export function LoadingIndicator(props: ILoadingIndicatorProps) {
  return <FullPageLoading />
}

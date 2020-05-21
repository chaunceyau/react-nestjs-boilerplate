import React from 'react'

interface ButtonProps {
  color: TailwindColors
  children: React.ReactNode
  fluid?: boolean
  loading?: boolean
  onClick?: () => any
}

export function Button(props: ButtonProps) {
  const cursor = props.loading ? 'cursor-wait ' : 'cursor-pointer '
  let className = 'font-semibold py-2 px-4 rounded ' + cursor
  if (props.fluid) {
    className = className + ' w-full '
  }
  switch (props.color) {
    case 'white':
      className = className + 'bg-white hover:shadow border text-gray-700'
      break
    case 'gray':
      className =
        className + 'text-black bg-gray-400 hover:bg-gray-500 text-gray-700'
      break
    case 'black':
      className = className + 'bg-black text-white hover:shadow text-gray-700'
      break
    default:
      className =
        className +
        `text-white bg-${props.color}-${
          props.loading ? 300 : 500
        } ${!props.loading && `hover:bg-${props.color}-600 hover:shadow`}`
      break
  }

  return (
    <button
      className={className}
      onClick={props.onClick}
      disabled={props.loading}
    >
      {props.loading ? <LoadingSvg /> : props.children}
    </button>
  )
}

type TailwindColors =
  | 'blue'
  | 'red'
  | 'teal'
  | 'gray'
  | 'black'
  | 'white'
  | 'yellow'
  | 'orange'
  | 'green'
  | 'indigo'
  | 'purple'
  | 'pink'

const LoadingSvg = () => (
  <div className="flex justify-center">
    <div className="loadingio-spinner-spin-wqhcy5oceug">
      <div className="ldio-3adv29bifvq">
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
      </div>
    </div>
  </div>
)

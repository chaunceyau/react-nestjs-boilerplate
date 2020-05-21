import React from 'react'

interface CardProps {
  title: string
  children: React.ReactNode
  marginBottom?: boolean
  cta?: React.ReactNode
}

export function Card(props: CardProps) {
  const bottom = props.marginBottom && 'mb-4'

  if (props.cta)
    return (
      <div className={`bg-white rounded shadow px-6 pt-4 pb-6 ${bottom}`}>
        <div className="flex justify-between">
          <h2 className="text-xl mb-2">{props.title}</h2>
          {props.cta}
        </div>
        {props.children}
      </div>
    )
  return (
    <div className={`bg-white rounded shadow px-6 pt-4 pb-6 ${bottom}`}>
      <h2 className="text-xl mb-2">{props.title}</h2>
      {props.children}
    </div>
  )
}

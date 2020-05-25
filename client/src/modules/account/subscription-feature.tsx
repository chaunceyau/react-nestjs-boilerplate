import React from 'react'

interface SubscriptionFeatureProps {}

export function SubscriptionFeature(props: SubscriptionFeatureProps) {
  return (
    <div className="flex items-center mb-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 848 848"
      >
        <g id="Group_2" data-name="Group 2" transform="translate(-483 -170)">
          <circle
            id="Ellipse_1"
            data-name="Ellipse 1"
            cx="424"
            cy="424"
            r="424"
            transform="translate(483 170)"
            fill="rgb(0,255,0,0.15)"
          />
          <g
            id="Group_1"
            data-name="Group 1"
            transform="translate(-0.604 -29.774)"
          >
            <rect
              id="Rectangle_1"
              data-name="Rectangle 1"
              width="307"
              height="110"
              rx="27.5"
              transform="translate(699.385 544.246) rotate(45)"
              fill="green"
            />
            <rect
              id="Rectangle_2"
              data-name="Rectangle 2"
              width="500"
              height="110"
              rx="27.5"
              transform="translate(1192.939 485.556) rotate(135)"
              fill="green"
            />
          </g>
        </g>
      </svg>
      <span className="ml-2 text-gray-700 tracking-wide">this is current plan</span>
    </div>
  )
}

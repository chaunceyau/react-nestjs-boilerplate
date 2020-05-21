import React from 'react'

interface FullPageLoadingProps {}

export function FullPageLoading(props: FullPageLoadingProps) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <svg
        style={{
          margin: 'auto',
          display: 'block',
          shapeRendering: 'auto',
          backgroundPosition: 'initial initial',
          backgroundRepeat: 'initial initial'
        }}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          r="0"
          fill="none"
          stroke="#220b09"
          stroke-width="2"
        >
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.5384615384615383s"
            values="0;25"
            keyTimes="0;1"
            keySplines="0 0.2 0.8 1"
            calcMode="spline"
            begin="-0.7692307692307692s"
          />
          <animate
            attributeName="opacity"
            repeatCount="indefinite"
            dur="1.5384615384615383s"
            values="1;0"
            keyTimes="0;1"
            keySplines="0.2 0 0.8 1"
            calcMode="spline"
            begin="-0.7692307692307692s"
          />
        </circle>
        <circle
          cx="50"
          cy="50"
          r="0"
          fill="none"
          stroke="#d34c31"
          stroke-width="2"
        >
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.5384615384615383s"
            values="0;25"
            keyTimes="0;1"
            keySplines="0 0.2 0.8 1"
            calcMode="spline"
          />
          <animate
            attributeName="opacity"
            repeatCount="indefinite"
            dur="1.5384615384615383s"
            values="1;0"
            keyTimes="0;1"
            keySplines="0.2 0 0.8 1"
            calcMode="spline"
          />
        </circle>
      </svg>
    </div>
  )
}

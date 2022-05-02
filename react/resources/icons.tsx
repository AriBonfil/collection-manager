import React from "react"
import { SVGProps } from "react"

export const OptionsDots = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className="vtex__icon-options-dots"
    width={16}
    height={16}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <g className="nc-icon-wrapper" fill="#444">
      <g className="nc-interact_dots-close-o-32">
        <g className="nc-dot_left" transform="rotate(90 16 16)">
          <circle cx={6} cy={16} r={2} data-cap="butt" data-stroke="none" />
          <circle
            cx={6}
            cy={16}
            r={2}
            fill="none"
            stroke="#444"
            strokeLinecap="square"
            strokeWidth={2}
          />
        </g>
        <g className="nc-dot_right" transform="rotate(90 16 16)">
          <circle cx={26} cy={16} r={2} data-cap="butt" data-stroke="none" />
          <circle
            cx={26}
            cy={16}
            r={2}
            fill="none"
            stroke="#444"
            strokeLinecap="square"
            strokeWidth={2}
          />
        </g>
        <g className="nc-dot_center" transform="rotate(90 16 16)">
          <circle cx={16} cy={16} r={2} data-cap="butt" data-stroke="none" />
          <circle
            cx={16}
            cy={16}
            r={2}
            fill="none"
            stroke="#444"
            strokeLinecap="square"
            strokeWidth={2}
          />
        </g>
      </g>
    </g>
  </svg>
)

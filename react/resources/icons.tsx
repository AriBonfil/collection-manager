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

export const LockIcon = ({size = 24,...props}: SVGProps<SVGSVGElement> & {size:number}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 172 172"
    style={{
      fill: "#000",
    }}
    {...props}
  >
    <g
      fill="none"
      strokeMiterlimit={10}
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
      style={{
        mixBlendMode: "normal",
      }}
    >
      <path d="M0 172V0h172v172z" />
      <path
        d="M86 7.167c-23.82 0-43 19.179-43 43v7.166c-7.834 0-14.333 6.5-14.333 14.334v71.666c0 7.834 6.5 14.334 14.333 14.334h86c7.834 0 14.333-6.5 14.333-14.334V71.667c0-7.834-6.5-14.334-14.333-14.334v-7.166c0-23.821-19.18-43-43-43zM86 21.5c16.313 0 28.667 12.354 28.667 28.667v7.166H57.333v-7.166C57.333 33.854 69.687 21.5 86 21.5zM43 71.667h86v71.666H43zm43 21.5c-7.883 0-14.333 6.45-14.333 14.333s6.45 14.333 14.333 14.333 14.333-6.45 14.333-14.333S93.883 93.167 86 93.167z"
        fill="currentColor"
      />
    </g>
  </svg>
)

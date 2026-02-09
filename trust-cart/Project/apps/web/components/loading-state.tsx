
"use client"

import { LoaderCircleIcon, LoaderIcon, LoaderPinwheelIcon, type LucideProps } from "lucide-react"
import { cn } from "@/lib/utils"

type SpinnerVariantProps = Omit<SpinnerProps, "variant">

const Ring = ({ size = 24, ...props }: SpinnerVariantProps) => (
  <svg
    height={size}
    stroke="currentColor"
    viewBox="0 0 44 44"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...(props as any)}
  >
    <title>Loading...</title>
    <g fill="none" fillRule="evenodd" strokeWidth="2">
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="0s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.165, 0.84, 0.44, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 20"
        />
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.3, 0.61, 0.355, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 0"
        />
      </circle>
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="-0.9s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.165, 0.84, 0.44, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 20"
        />
        <animate
          attributeName="stroke-opacity"
          begin="-0.9s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.3, 0.61, 0.355, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 0"
        />
      </circle>
    </g>
  </svg>
)



export type SpinnerProps = LucideProps & {
  variant?:
    "ring"
}

export const Spinner = ({ variant, ...props }: SpinnerProps) => {
      return <Ring {...(props as any)} />
  }

// Demo
export function LoadingState() {
  return (
        <div className="flex flex-col items-center gap-2">
          <Spinner variant="ring" size={32} />
          <span className="text-xs text-muted-foreground">Loading...</span>
        </div>
  )
}

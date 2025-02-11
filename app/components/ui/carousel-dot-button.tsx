import type React from "react"

interface DotButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export const DotButton: React.FC<DotButtonProps> = ({ className, ...restProps }) => {
  return <button type="button" className={`cursor-pointer ${className}`} {...restProps} />
}


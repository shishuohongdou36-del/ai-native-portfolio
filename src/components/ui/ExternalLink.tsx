import type { AnchorHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/cn"

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

export function ExternalLink({ children, className, ...rest }: ExternalLinkProps) {
  const isExternal = rest.href?.startsWith("http")
  return (
    <a
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 text-text-secondary transition-colors duration-200 hover:text-accent-cyan",
        className
      )}
      {...rest}
    >
      {children}
      {isExternal && (
        <svg
          className="h-3 w-3 opacity-60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      )}
    </a>
  )
}

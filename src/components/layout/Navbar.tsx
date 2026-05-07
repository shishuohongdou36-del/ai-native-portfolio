import { useEffect, useState } from "react"
import { NAV_LINKS, SECTION_IDS } from "@/lib/constants"
import { profile } from "@/data/profile"
import { cn } from "@/lib/cn"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-300",
        scrolled
          ? "border-b border-border-subtle bg-bg-primary/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between md:h-[72px]">
        <a
          href={`#${SECTION_IDS.hero}`}
          className="group flex items-center gap-2.5"
          aria-label="Back to top"
        >
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" aria-hidden />
          </span>
          <span className="font-display text-[14px] font-medium tracking-tight text-text-primary">
            {profile.name}
            <span className="ml-3 hidden font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted sm:inline">
              AI Native Builder
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="text-[13px] font-medium tracking-wide text-text-secondary transition-colors duration-200 hover:text-text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`#${SECTION_IDS.contact}`}
          className="hidden rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-1.5 text-[12px] font-medium text-accent-cyan transition-colors duration-200 hover:bg-accent-cyan/20 md:inline-flex"
        >
          联系我
        </a>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle text-text-secondary md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border-subtle bg-bg-primary/95 backdrop-blur-xl">
          <ul className="container-x flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-glass hover:text-text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`#${SECTION_IDS.contact}`}
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-md border border-accent-cyan/40 bg-accent-cyan/10 px-3 py-2.5 text-sm text-accent-cyan"
              >
                联系我
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

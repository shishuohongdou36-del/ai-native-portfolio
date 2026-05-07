import { profile } from "@/data/profile"
import { channels } from "@/data/contact"
import { ExternalLink } from "@/components/ui/ExternalLink"

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-primary">
      <div className="container-x flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-sm font-medium text-text-primary">
            {profile.name} <span className="ml-2 text-text-muted">— {profile.title}</span>
          </p>
          <p className="mt-1 text-[12px] text-text-muted">
            © {new Date().getFullYear()} · Built as a digital experimental lab.
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
          {channels.map((c) => (
            <li key={c.label}>
              <ExternalLink href={c.href}>{c.label}</ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

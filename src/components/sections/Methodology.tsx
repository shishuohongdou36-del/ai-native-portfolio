import { motion, useReducedMotion } from "framer-motion"
import { SECTION_IDS } from "@/lib/constants"
import { methodology } from "@/data/methodology"
import { Reveal } from "@/components/ui/Reveal"

export function Methodology() {
  const reduced = useReducedMotion()
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.08,
      },
    },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.2 : 0.42, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id={SECTION_IDS.methodology} className="py-section-y-m md:py-section-y-d">
      <div className="container-x">
        <header className="mb-16 grid gap-x-16 gap-y-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">
                <span className="mr-3 inline-block h-px w-8 align-middle bg-text-muted/60" />
                04 / Methodology
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-section-m font-medium leading-[1.15] text-text-primary md:text-section-d">
                从模糊，
                <br />
                到产品。
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <p className="text-[16px] leading-[1.8] text-text-secondary md:text-[17px]">
                六个有顺序的动作，每次都跑一遍。不论领域，顺序比单一步骤更重要，跳过一步，其余的都会渗漏。
              </p>
            </Reveal>
          </div>
        </header>

        <motion.ol
          className="border-t border-border-subtle"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          {methodology.map((m) => (
            <li key={m.step} className="group">
              <motion.div variants={itemVariants}>
                <div className="grid grid-cols-[auto_1fr] gap-x-8 border-b border-border-subtle py-10 transition-colors duration-500 hover:border-border-active md:grid-cols-[10rem_minmax(0,1fr)_minmax(0,1.5fr)] md:gap-x-16 md:py-14">
                  <span className="font-display text-[clamp(48px,7vw,84px)] font-medium leading-[0.95] text-text-muted/30 transition-colors duration-500 group-hover:text-accent-cyan/50">
                    {m.step}
                  </span>
                  <h3 className="font-display text-2xl font-medium leading-tight text-text-primary md:pt-3 md:text-3xl">
                    {m.title}
                  </h3>
                  <p className="col-start-2 mt-3 max-w-2xl text-[16px] leading-[1.85] text-text-secondary md:col-start-3 md:mt-0 md:pt-4">
                    {m.description}
                  </p>
                </div>
              </motion.div>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

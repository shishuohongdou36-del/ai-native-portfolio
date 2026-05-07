import { MotionProvider } from "@/context/MotionContext"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { BackgroundField } from "@/components/visuals/BackgroundField"
import { CursorGlow } from "@/components/visuals/CursorGlow"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { CapabilityMap } from "@/components/sections/CapabilityMap"
import { FeaturedProjects } from "@/components/sections/FeaturedProjects"
import { Methodology } from "@/components/sections/Methodology"
import { Writing } from "@/components/sections/Writing"
import { Contact } from "@/components/sections/Contact"

export default function App() {
  return (
    <MotionProvider>
      <BackgroundField />
      <CursorGlow />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <CapabilityMap />
        <FeaturedProjects />
        <Methodology />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  )
}

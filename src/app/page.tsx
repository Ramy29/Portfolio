import React from 'react'
import Hero from './_components/hero'
import WhyUs from './_components/why-us'
import AboutMe from './_components/about-me'
import Projects from './_components/projects'

export default function Home() {
  return (
    <div>
      <Hero/>
      <AboutMe/>
      <Projects/>
    </div>
  )
}

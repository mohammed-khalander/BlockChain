'use client'

import React, { Suspense, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { TimelineAnimation } from '@/components/ui-layouts/timeline-animation'
import { useMediaQuery } from '@/components/ui-layouts/use-media-query'

import { HeroBackground } from './hero-background'
import { Navbar } from './navbar'

export const HeroAiInfrastructure = () => {
  const timelineRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section
      ref={timelineRef}
      className="relative min-h-screen flex flex-col bg-black text-white w-full overflow-hidden"
    >
      <HeroBackground/>
      <Navbar timelineRef={timelineRef} />

      {/* Main Content */}

      <div className={`relative grow flex flex-col items-center justify-center text-center px-4 mb-10 ${isMobile && "pt-10 justify-start"} `}>
        <TimelineAnimation
          timelineRef={timelineRef}
          animationNum={3}
          className="border border-blue-800 flex items-center gap-2 rounded-2xl p-1 pr-3 bg-blue-800/50 backdrop-blur-lg"
        >
          <span className="py-1 px-1.5 rounded-lg bg-blue-600 text-white max-md:text-sm ">
            Web3
          </span>
          <span>{ isMobile ?  "OnChain" : "Fully Decentralized"} community funding protocol</span>
        </TimelineAnimation>
        <TimelineAnimation
          timelineRef={timelineRef}
          as="h1"
          animationNum={4}
          className={`md:text-7xl font-medium tracking-tight leading-[120%] max-w-5xl my-5 text-5xl `}
        >
          Powering the Next <br />
          Generation of BlockChain
          <br />
          Infrastructure
        </TimelineAnimation>

        <TimelineAnimation
          timelineRef={timelineRef}
          as="p"
          animationNum={5}
          className={`text-neutral-300 md:text-xl max-w-xl mb-10 font-light ${isMobile?"text-md":"text-lg"} `}
        >
          Transparent. Decentralized. Community-Owned.
          <br/>
Fund local initiatives through smart contracts where every contribution is recorded on-chain and governed by the people.
        </TimelineAnimation>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <TimelineAnimation
            timelineRef={timelineRef}
            as="button"
            animationNum={6}
            className="cursor-pointer bg-white text-black px-6 py-3 rounded-sm font-semibold flex items-center gap-2 hover:bg-neutral-200 transition"
          >
            Fund the Community <ArrowRight size={18} />
          </TimelineAnimation>
          <TimelineAnimation
            timelineRef={timelineRef}
            as="button"
            animationNum={7}
            className="cursor-pointer relative bg-white/10 hover:bg-white/20 transition px-8 py-3 rounded-sm font-semibold border border-white/20 backdrop-blur-md"
          >
            Create Campaign
          </TimelineAnimation>
        </div>
      </div>

    
    </section>
  )
}

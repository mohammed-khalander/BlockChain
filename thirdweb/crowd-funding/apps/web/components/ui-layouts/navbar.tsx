"use client";

import MotionDrawer from '@/components/ui-layouts/motion-drawer'
import { useMediaQuery } from '@/components/ui-layouts/use-media-query'
import React, { RefObject, Suspense, useRef } from 'react'
import { TimelineAnimation } from './timeline-animation';
import Image from 'next/image';


interface NavbarProps {
  timelineRef: RefObject<HTMLDivElement | null>
}


export const Navbar = ({ timelineRef }: NavbarProps)=>{
  const isMobile = useMediaQuery('(max-width: 768px)')


    return(
        <>
    {isMobile && (
        <div className="flex gap-4 justify-between items-center px-10 pt-4 relative z-10">
          <MotionDrawer
            direction="left"
            width={300}
            backgroundColor={'#000000'}
            clsBtnClassName="bg-neutral-800 border-r border-neutral-900 text-white"
            contentClassName="bg-black border-r border-neutral-900 text-white"
            btnClassName="bg-white text-black relative w-fit p-2 left-0 top-0"
          >
            <nav className="space-y-4 ">
              <div className="flex items-center gap-2 text-white">
                <Image src="/logo-2.png" height={150} width={200} alt="Crowd-Fund" />
              </div>
              <a
                href="#"
                className="block p-2 hover:bg-neutral-100 hover:text-black rounded-sm"
              >
                Products
              </a>
              <a
                href="#"
                className="block p-2 hover:bg-neutral-100 hover:text-black rounded-sm"
              >
                Leaderboards
              </a>
              <a
                href="#"
                className="block p-2 hover:bg-neutral-100 hover:text-black rounded-sm"
              >
                Enterprise
              </a>
            </nav>
          </MotionDrawer>
          <TimelineAnimation
            as="button"
            timelineRef={timelineRef}
            animationNum={2}
            className="cursor-pointer bg-white/10 hover:bg-white/20 transition px-2 py-2 rounded text-sm font-medium border border-white/10 backdrop-blur-md"
          >
            Register For Free
          </TimelineAnimation>
        </div>
      )}
      {!isMobile && (
        <header className="relative z-10 flex items-center max-w-7xl mx-auto w-full justify-between px-8 py-6">
          <TimelineAnimation
            timelineRef={timelineRef}
            animationNum={1}
            className="flex items-center gap-5"
          >
            <div className="text-2xl font-semibold tracking-tight">
              <Image src="/logo-2.png" height={150} width={200} alt="Crowd-Fund" />
            </div>
            <nav className="hidden md:flex items-center gap-6 text-md text-neutral-300">
              <a href="#" className="hover:text-white transition">
                Products
              </a>
              <a href="#" className="hover:text-white transition">
                Leaderboards
              </a>
              <a href="#" className="hover:text-white transition">
                Enterprise
              </a>
            </nav>
          </TimelineAnimation>
          <div className="flex items-center gap-4">
            <TimelineAnimation
              as="button"
              timelineRef={timelineRef}
              animationNum={2}
              className="cursor-pointer bg-white/10 hover:bg-white/20 transition px-2 py-2 rounded text-sm font-medium border border-white/10 backdrop-blur-md"
            >
              Register For Free
            </TimelineAnimation>
          </div>
        </header>
      )}

        </>
    )
}
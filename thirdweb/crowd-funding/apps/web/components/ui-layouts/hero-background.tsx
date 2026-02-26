'use client'

import { Suspense } from 'react'
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'

export const HeroBackground = () => {
  return (
    <Suspense>
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '200vh',
            zIndex:0,
          }}
          lazyLoad={undefined}
          fov={undefined}
          pixelDensity={1}
          pointerEvents="none"
        >
          <ShaderGradient
            animate="on"
            type="sphere"
            wireframe={false}
            shader="defaults"
            uTime={0}
            uSpeed={0.3}
            uStrength={0.4}
            uDensity={0.8}
            uFrequency={5.5}
            uAmplitude={7}
            positionX={0}
            positionY={0}
            positionZ={0}
            rotationX={0}
            rotationY={0}
            rotationZ={140}
            color1="#1f469a"
            color2="#000000"
            color3="#000000"
            reflection={0.5}
            // View (camera) props
            cAzimuthAngle={250}
            cPolarAngle={140}
            cDistance={1.5}
            cameraZoom={12.5}
            // Effect props
            lightType="3d"
            brightness={1.5}
            envPreset="city"
            grain="on"
            // Tool props
            toggleAxis={false}
            zoomOut={false}
            hoverState=""
            // Optional - if using transition features
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </Suspense>
  )
}
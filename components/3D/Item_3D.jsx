"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';

import CanvasModel from './CanvasModel';

function Item_3D({item, scale}) {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className='h-24 w-20' ref={inViewRef}>
      <Canvas
        shadows
        frameloop='demand'
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, -5, 0],
        }}
      >
        <Suspense>
          <ambientLight />
          <spotLight position={[10, 10, 10]} angle={0.3} />
          <CanvasModel animate={inView} item={item} scale={scale} />
          <Environment preset="sunset" />
          <OrbitControls
            autoRotate
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Item_3D;
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { a } from '@react-spring/three';

const Model = ({ asset, scale }) => {
  const { scene } = useGLTF(`/${asset}/scene.gltf`);

  return (
    <a.primitive object={scene} position={[0, -1, 0]} scale={scale} /> // Adjust the model position
  );
};

const CanvasModel = ({ asset, scale }) => {
  return (
    <>
      <Model asset={asset} scale={scale} />
    </>
  );
};

export default CanvasModel;

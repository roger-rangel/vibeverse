
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { a } from '@react-spring/three';

const Model = ({ item, scale }) => {
  const { scene } = useGLTF(`/${item}/scene.gltf`);

  return (
    <a.primitive object={scene} position={[0, -1, 0]} scale={scale} /> // Adjust the model position
  );
};


const CanvasModel = ({ item, scale}) => {
  return (
    <>
      <Model item={item} scale={scale} />
    </>
  );
};

export default CanvasModel;
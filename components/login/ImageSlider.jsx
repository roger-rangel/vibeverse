'use client';
// ImageSlider.js
import React from 'react';
import { useSprings, animated } from 'react-spring';

const ImageSlider = ({ images, duration, startOffset }) => {
  const totalImages = images.length;

  const springs = useSprings(
    totalImages,
    images.map((image, index) => ({
      from: { y: (index * 100) + startOffset },
      to: async (next) => {
        while (true) {
          for (let i = 1; i <= totalImages; i++) {
            await next({ y: (index - i) * 100 });
          }
        }
      },
      config: { duration: totalImages * duration * 1000 },
    }))
  );

  return (
    <div className="overflow-hidden relative h-full ">
      {springs.map((spring, index) => (
        <animated.div
          key={index}
          className="h-custom-image-wrapper absolute w-full left-0"
          style={{
            top: spring.y.interpolate((y) => `calc(${y}% - 1rem)`),
            height: `calc(${100 / 1}% - 1rem)`,
          }}
        >
          <div
            className="h-full w-full bg-center bg-cover bg-no-repeat pb-4 rounded-xl"
            style={{
              backgroundImage: `url(${images[index]})`,
            }}
          />
        </animated.div>
      ))}
    </div>
  );
};

export default ImageSlider;
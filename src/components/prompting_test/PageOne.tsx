import Image from 'next/image';

export function PageOne({ bottomMarkerRef }: { bottomMarkerRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div id="page-1" className="mx-10 bg-white py-20 text-black lg:pt-12">
      <h1 className="mb-8 text-4xl font-bold">Text-to-Image Models</h1>
      <p className="mb-8">
        When it comes to text-to-image models,a few options arise. Here are the
        top models we could think of:
      </p>

      {/* Image 1 */}
      <div className="relative mb-6">
        <Image
          width={500}
          height={250}
          src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/GDyrwxbWoAAfSqW.jpg"
          alt="Dall-E"
          className="h-64 w-full rounded-xl object-cover"
        />
        <h2 className="absolute left-0 top-0 mb-2 bg-white bg-opacity-75 p-2 text-lg font-semibold">
          Dall-E
        </h2>
      </div>

      {/* Image 2 */}
      <div className="relative mb-6">
        <Image
          width={500}
          height={250}
          src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/cover-prompt-from-image-1024x701.webp"
          alt="Stable Diffusion"
          className="h-64 w-full rounded-xl object-cover"
        />
        <h2 className="absolute left-0 top-0 mb-2 bg-white bg-opacity-75 p-2 text-lg font-semibold">
          Stable Diffusion
        </h2>
      </div>

      {/* Image 3 */}
      <div className="relative mb-6">
        <Image
          width={500}
          height={250}
          src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/GDOSZ7aXcAAWr_F.jpg"
          alt="Firefly"
          className="h-64 w-full rounded-xl object-cover"
        />
        <h2 className="absolute left-0 top-0 mb-2 bg-white bg-opacity-75 p-2 text-lg font-semibold">
          Adobe Firefly
        </h2>
      </div>

      {/* Image 4 */}
      <div className="relative mb-6">
        <Image
          width={500}
          height={250}
          src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_3-TLF0lNdqd.webp"
          alt="Midjourney"
          className="h-64 w-full rounded-xl object-cover"
        />
        <h2 className="absolute left-0 top-0 mb-2 bg-white bg-opacity-75 p-2 text-lg font-semibold">
          Midjourney
        </h2>
      </div>
      <div ref={bottomMarkerRef} id="page-bottom-marker"></div>
    </div>
  );
}

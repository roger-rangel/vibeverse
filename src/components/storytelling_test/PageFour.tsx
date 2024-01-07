// Note: Page Four Component for Storytelling Test
import Image from 'next/image';

export function PageFour() {

  const images = [
    { url: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_1-ZSySjPyBT.webp', text: '6. Tests, Allies, Enemies' },
    { url: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_1_(1).webp', text: '7. Approaching the Inner Cave' },
    { url: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_3.webp', text: '8. The Ordeal' },
    { url: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_3_(1).webp', text: '9. Seize the Reward' }
  ];

  // Define the image data for Act 3
  const imagesAct3 = [
    { url: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_3-ybsKLSNnm.webp', text: '10. The Road Back Home' },
    { url: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_1-wP--i3lxW.webp', text: '11. Resurrection' },
    { url: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_2_(1)-BOOsIlAXi.webp', text: '12. Return with the Elixir' },
  ];

  return (
    <div id="page-4" className="mx-10 py-6 lg:pt-12 text-black bg-white min-h-[75vh]">


      <Image 
        src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_1-xfF_SDNsW.webp" 
        alt="Descriptive Alt Text" 
        className="h-80 w-full object-cover mx-auto rounded-2xl" 
        width={500}
        height={500}
      />
      <h2 className="text-lg my-8">
        <strong>Act 2</strong> is where there are more tests, more allies, and more enemies. 
        <br />
        <br />
        The heroes will consequently have to avoid crazy obstacles and make progress in their journey. 
      </h2>

      <h2 className="text-lg my-8">
          It continues as follows:
      </h2>

      <h1 className="mb-4 flex justify-center text-lg text-zinc-600">
          ACT 2
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {images.map(({ url, text }, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Image */}
            <Image 
              src={url}
              alt={`Descriptive Alt Text for Image ${index + 1}`}
              className="object-cover mx-auto rounded-2xl"
              width={500}
              height={300}
            />
            {/* Text below the image */}
            <p className="text-xs mt-2">{text}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg my-16">
        <strong>Act 3</strong> concludes the Hero&apos;s Journey with the hero&apos;s return and their 
        transformation, bringing back new wisdom or power to restore balance to their world.
      </h2>

      {/* Container for Act 3 images */}
      <div className="grid grid-cols-3 gap-4">
        {imagesAct3.map(({ url, text }, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Image */}
            <Image 
              src={url}
              alt={`Descriptive Alt Text for Image ${index + 1}`}
              className="object-cover mx-auto rounded-2xl"
              width={500}
              height={300}
            />
            {/* Text below the image */}
            <p className="text-xs mt-2 text-center">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
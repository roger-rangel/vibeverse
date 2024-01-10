import Image from 'next/image';

export function PageOne() {

  return (
    <div id="page-1" className="mx-10 pt-10 lg:pt-12 text-black bg-white">
      <h1 className="text-4xl font-bold mb-8">Structure</h1>
      <p className="mb-4">When we think about how films typically tell stories, most of the time they follow a three Act structure:</p>
      
      {/* Image 1 */}
      <div className="mb-6 relative">
        <Image width={500} height={250} src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_0_(2).webp" alt="Act One: The Setup" className="w-full object-cover h-32 rounded-xl" />
        <h2 className="text-lg font-semibold mb-2 absolute top-0 left-0 bg-white bg-opacity-75 p-2">Act One: The Setup</h2>
      </div>

      {/* Image 2 */}
      <div className="mb-6 relative">
        <Image width={500} height={250} src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_2_(1).webp" alt="Act One: The Setup" className="w-full object-cover h-32 rounded-xl" />
        <h2 className="text-lg font-semibold mb-2 absolute top-0 left-0 bg-white bg-opacity-75 p-2">Act Two: The Confrontation</h2>
      </div>

      {/* Image 3 */}
      <div className="mb-6 relative">
        <Image width={500} height={250} src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_2_(2).webp" alt="Act One: The Setup" className="w-full object-cover h-32 rounded-xl" />
        <h2 className="text-lg font-semibold mb-2 absolute top-0 left-0 bg-white bg-opacity-75 p-2">Act Three: The Resolution</h2>
      </div>
    </div>
  );
}
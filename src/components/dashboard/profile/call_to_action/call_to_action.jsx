import Image from 'next/image';

const features = [
  {
    title: 'Assets',
    icon: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1169.png',
  },
  {
    title: 'AI Tools',
    icon: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1175_(1).png',
  },
  {
    title: 'Vibe',
    icon: 'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Group_1175.png',
  },
];

const Call_To_Action = ({}) => {
  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-0 lg:px-2">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 xs:pt-12 xs:mb-24">
          <Image
            src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/Avatar.png"
            alt="Product screenshot"
            className="w-3/4 flex m-auto"
            width={2432}
            height={1442}
          />
          <div className="lg:pr-8 lg:pt-4 px-8">
            <div className="lg:max-w-lg md:pt-10">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Connect & Collaborate</h2>
              <p className="mt-4 mb-4 sm:mt-4 sm:mb-6 sm:text-4xl lg:text-6xl font-bold text-gray-300" style={{ lineHeight: '1.2' }}>AI-Powered Creativity</p>
              <div className='flex pt-4'>
                <div className='flex gap-x-2'>
                  {features.map((feature) => (
                    <div key={feature.title}>
                      <Image
                        src={feature.icon}
                        alt="Product screenshot"
                        className="m-auto"
                        width={500}
                        height={500}
                      />
                      <p className="mt-2 text-lg leading-8 text-teal-200 flex justify-center items-center">
                        {feature.title}
                      </p>
                    </div>
                  )) }

                </div>
              </div>  
            </div>
          </div>
        </div>
        {/* ADD BUTTON GRADIENT TO CONNECT ICP WALLET / WEB3 */}
        {/* add more sections */}

      </div>
    </div>
  );
};

export default Call_To_Action;
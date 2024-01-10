import { useRef, useState } from 'react';
import Image from 'next/image';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { XMarkIcon } from '@heroicons/react/24/outline';

const ItemType = {
  IMAGE: 'image'
};

type DraggableImageProps = {
  id: string;
  url: string;
  onDrop: (id: string, url: string, targetId: number) => void;
};

// Draggable image component
function DraggableImage({ id, url, onDrop }: DraggableImageProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.IMAGE,
    item: { id, url },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDrop(item.id, item.url, (dropResult as { targetId: number }).targetId);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <Image
      ref={drag}
      src={url}
      className={`h-32 border-2 border-orange-500 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      alt={`Draggable item ${id}`}
      width={200}
      height={200}
    />
  );
}

// Correct the type definition for the `droppedImages` state
type DroppedImagesState = { [key: number]: { id: string; url: string } | undefined };

type DropTargetProps = {
  targetId: number;
  droppedImage: { id: string; url: string } | undefined;
  label: string;
};

function DropTarget({ targetId, droppedImage, label }: DropTargetProps) {
  const [, drop] = useDrop({
    accept: ItemType.IMAGE,
    drop: () => ({ targetId }),
  });

  return (
    <div className="mx-2 my-2 flex flex-col items-center">
      <div ref={drop} className="border-2 border-dashed border-gray-300 h-32 w-32 flex justify-center items-center overflow-hidden relative">
        {droppedImage ? (
          <Image
            src={droppedImage.url}
            alt={`Dropped item`}
            width={128} // Adjust width as needed
            height={128} // Adjust height as needed
            className="object-cover"
            layout="fixed"
          />
        ) : (
          <span className="text-2xl font-bold text-gray-700">{targetId}</span> // This will display the number when the box is empty
        )}
      </div>
      <div className="w-full text-center py-1 text-xs">{label}</div>
    </div>
  );
}

type PageThreeProps = {
  onAnswerSelected: () => void;
};

// PageThree component
export function PageThree({ onAnswerSelected }: PageThreeProps) {
  const [showGoodJob, setShowGoodJob] = useState(false);
  const [showPoints, setShowPoints] = useState(false);
  const [checkClicked, setCheckClicked] = useState(false);
  const endOfPageRef = useRef<HTMLDivElement>(null);
  const [showExplanationPopup, setShowExplanationPopup] = useState(false);

  // Function to toggle the explanation popup
  const toggleExplanationPopup = () => {
    setShowExplanationPopup(!showExplanationPopup);
  };

  const handleCheck = () => {
    setCheckClicked(true);
    setShowGoodJob(true); // Immediately show the Good Job message

    // After 1 second, show the points and call onAnswerSelected
    setTimeout(() => {
      onAnswerSelected();
    }, 500);

    setTimeout(() => {
      setShowPoints(true);
    }, 1000);

    // Scroll to the ref after a short delay
    setTimeout(() => {
      endOfPageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const squareLabels = [
    { id: 1, text: 'The Ordinary World' },
    { id: 2, text: 'The Call of Adventure' },
    { id: 3, text: 'Refusal of the Call' },
    { id: 4, text: 'Meeting the Mentor' },
    { id: 5, text: 'Crossing the Threshold' },
  ];

  const initialImages = [
    'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_2_(3).webp',
    'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_0.webp',
    'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_1.webp',
    'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_2.webp',
    'https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/0_2_(1)-Ck_kj733y.webp'
  ];

  // Changed to keep track of images that have been dropped
  const [droppedImages, setDroppedImages] = useState<DroppedImagesState>({});

  const handleDrop = (imageId: string, url: string, targetId: number) => {
    setDroppedImages(prev => ({
      ...prev,
      [targetId]: { id: imageId, url }
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div id="page-3" className="mx-10 -mt-40 lg:pt-12 text-black bg-white">
        
        <h2 className="text-lg mb-4">
          In Western storytelling, stories usually follow what is known as a <strong>Hero&apos;s journey</strong>.
        </h2>

        
        <h1 className="mt-20 text-2xl mb-6 text-zinc-600">
          THE HERO&apos;S JOURNEY 
        </h1>
        <h2 className="text-lg mb-4">
          This is a 12-step narrative structure that describes the typical adventure of a hero.
        </h2>

        <div className="flex overflow-x-auto gap-x-2">
          {initialImages.map((url, index) => (
            <DraggableImage key={`image-${index}`} id={`image-${index}`} url={url} onDrop={handleDrop} />
          ))}
        </div>
        <h1 className="flex justify-end mt-2 text-sm mb-4 text-orange-300">
          drag and drop each image to the correct box
        </h1>

        <h1 className="flex justify-center mt-2 text-lg mb-2 text-zinc-600">
          ACT 1
        </h1>

        <div className="mt-2 flex justify-center flex-wrap pb-4">
          {squareLabels.map(({ id, text }, index) => (
            <div key={id} className={`flex flex-col items-center ${index < 3 ? 'w-1/3' : 'w-1/3'}`}>
              <DropTarget targetId={id} droppedImage={droppedImages[id]} label={text} />
            </div>
          ))}

        </div>

        {!checkClicked && (
          <button onClick={handleCheck} className="mx-auto mb-4 bg-black text-white px-4 py-2 rounded">
            Check
          </button>
        )}

        <div className="mb-24">
          <div className="mx-auto flex items-center justify-between">
            {showGoodJob && (   
              <div className="flex flex-row">
                <h1 className="ml-2 text-lg text-zinc-600">
                    Good job!
                </h1>
                <Image
                  src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/dancing_elf.gif"
                  alt="Good Job"
                  width={50}
                  height={50}
                  className="ml-2 -mt-2.5 h-8 w-8"
                />
              </div>          
            )
            }
            {/* Explanation Popup */}
            {showExplanationPopup && (
              <div className="fixed top-4 left-4 right-4 bg-white p-4 z-10 border border-gray-200 shadow-xl rounded-lg">
                <button
                  onClick={toggleExplanationPopup}
                  className="text-white bg-black rounded-full w-6 h-6 leading-none text-lg flex items-center justify-center absolute top-0 right-0 -m-2"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
                <div className="flex items-center mb-1">
                  <h1 className="text-2xl font-bold">Act 1 of the Hero&apos;s Journey</h1>
                  <Image
                    src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/knight.png"
                    alt="Good Job"
                    width={50}
                    height={50}
                    className="ml-4 flex items-center h-10 w-10"
                  />
                </div>
                <p>
                  {/* Your explanation content here */}
                  <br />
                  <strong>The Ordinary World:</strong> Meet our hero, comfortably curled up in their familiar bubble. It&apos;s comfy, cozy, and... 
                  well, a tad bit boring. This is where we see what &apos;normal&apos; looks like before things get wild!
                  <br />
                  <br />
                  <strong>The Call of Adventure:</strong> Suddenly, an invitation arrives! It&apos;s like getting a letter to a wizarding school or 
                  finding a hidden map in the attic. The hero&apos;s eyes sparkle with the first glimpse of a thrilling quest.
                  <br />
                  <br />
                  <strong>Refusal of the Call:</strong> &quot;Who, me?&quot; our hero gasps, stepping back. There&apos;s hesitation, a case of cold feet. 
                  Maybe it&apos;s fear, or maybe it&apos;s Tuesday, and the hero really doesn&apos;t want to miss their favorite TV show.
                  <br />
                  <br />
                  <strong>Meeting the Mentor:</strong> Just when our hero&apos;s about to give up, in comes a wise figure, possibly with a long beard and 
                  a cryptic riddle, offering the nudge (or magical doodad) needed to face the challenge ahead.
                  <br />
                  <br />
                  <strong>Crossing the Threshold:</strong> Taking a deep breath, our hero steps forward (or is nudged by a friendly sidekick) across an 
                  invisible line. Goodbye, Ordinary World! The adventure has officially begun, and there&apos;s no turning back now.
                  <br />
                  <br />
                </p>
              </div>
            )}
            {showPoints && (
              <div className="text-md bg-green-200 text-green-500 rounded-lg animate-slide-up py-0.5 px-1.5 flex items-center">
                <Image 
                  src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/diamond.png"
                  alt="Good Job"
                  width={50}
                  height={50}
                  className="flex items-center h-6 w-6"
                />
                {/* <PlusIcon className="h-4 w-4 font-bold" /> */}
                +10
                <h2 className="ml-1">VIBES</h2>
              </div> 
            )}
          </div>
          {showGoodJob && (
            <div className="my-4 bg-slate-200 p-4 rounded-lg flex justify-end">
              <div className="flex items-center border border-stone-400 p-2 rounded-lg hover:bg-slate-300 cursor-pointer">
                <span onClick={toggleExplanationPopup} className="text-md ">
                  Explain it to me
                </span>
                <Image 
                  src="https://cdn.pixelbin.io/v2/throbbing-poetry-5e04c5/original/open-book.png"
                  alt="Good Job"
                  width={200}
                  height={200}
                  className="ml-2 h-4 w-4"
                />
              </div>
            </div>
          )}
        </div>

        <div ref={endOfPageRef}></div>
      </div>
    </DndProvider>
  );
}

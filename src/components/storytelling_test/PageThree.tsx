import { useState } from 'react';
import Image from 'next/image';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
      className={`h-32 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
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


// PageThree component
export function PageThree() {
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
      <div id="page-3" className="mx-10 -mt-40 lg:pt-12 text-black bg-white min-h-[75vh]">
        
        <h2 className="text-lg mb-4">
          In Western storytelling, stories usually follow what is known as a <strong>Hero&apos;s journey</strong>.
        </h2>
        <h2 className="text-lg mb-4">
          This is a 12-step narrative structure that describes the typical adventure of a hero.
        </h2>

        <h2 className="mt-20 text-lg mb-4">
          Let&apos;s take a look at how this structure is applied in Act 1 for the film <span className="italic">Lord of the Rings: The Fellowship of the Ring</span>.
        </h2>
            
        <h1 className="mt-10 text-xl mb-4">
          THE HERO&apos;S JOURNEY <strong>- ACT 1</strong>
        </h1>

        <div className="flex overflow-x-auto gap-x-2">
          {initialImages.map((url, index) => (
            <DraggableImage key={`image-${index}`} id={`image-${index}`} url={url} onDrop={handleDrop} />
          ))}
        </div>
        <h1 className="flex justify-end mt-2 text-sm mb-10">
          drag and drop each image to the correct box
        </h1>

        <div className="mt-4 flex justify-center flex-wrap pb-10">
          {squareLabels.map(({ id, text }, index) => (
            <div key={id} className={`flex flex-col items-center ${index < 3 ? 'w-1/3' : 'w-1/2'}`}>
              <DropTarget targetId={id} droppedImage={droppedImages[id]} label={text} />
            </div>
          ))}
        </div>

      </div>
    </DndProvider>
  );
}



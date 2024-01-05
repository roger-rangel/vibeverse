import { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { getFileType, FileType } from '@/helpers/upload';

export function Player({
  path,
  name,
  className = '',
  autoPlay = false,
  controls = false,
  width = 480,
  height = 360,
}: {
  path: string;
  name?: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  width?: number;
  height?: number;
}) {
  const [fileType, setFileType] = useState<FileType>('unkown');

  useEffect(() => {
    (async () => {
      setFileType(await getFileType(path));
    })();
  }, [path]);

  const Content = useCallback(() => {
    switch (fileType) {
      case 'image':
        return (
          <LazyLoadImage
            src={path}
            effect="blur"
            width="350"
            height="350"
            alt={name}
            className="h-[350px] w-[350px] rounded-2xl object-cover"
          />
        );
      case 'audio':
        return <audio src={path} controls={controls} autoPlay={autoPlay} />;
      case 'unkown':
      case 'video':
        return (
          <ReactPlayer
            url={path}
            controls={controls}
            playing={autoPlay}
            width={width}
            height={height}
          />
        );
      default:
        return <div className="text-white">Unable to load content</div>;
    }
  }, [fileType, path, name, controls, autoPlay, width, height]);

  return (
    <div className="flex h-full min-h-[240px] min-w-[320px] items-center justify-center">
      <Content />
    </div>
  );
}

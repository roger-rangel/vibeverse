import { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import { getFileType, FileType } from '@/helpers/upload';

export function Player({
  path,
  name,
  className = '',
}: {
  path: string;
  name?: string;
  className?: string;
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
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={path} className={className} alt={name || ''} />;
      case 'audio':
        return <audio src={path} controls autoPlay />;
      case 'unkown':
      case 'video':
        return (
          <ReactPlayer url={path} controls playing width={480} height={360} />
        );
      default:
        return <></>;
    }
  }, [className, fileType, name, path]);

  return (
    <div className="flex h-full items-center justify-center">
      <Content />
    </div>
  );
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { getFileType } from '@/helpers/upload';
import { AssetType } from '@/types';

export function Player({
  path,
  name,
  className = 'h-full',
  autoPlay = false,
  controls = false,
  showAssetTypeSwitcher = false,
  width = 480,
  height = 360,
  onAssetTypeSwitch,
}: {
  path: string;
  name?: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  width?: number;
  height?: number;
  showAssetTypeSwitcher?: boolean;
  onAssetTypeSwitch?: (assetType: AssetType) => void;
}) {
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Other);

  useEffect(() => {
    (async () => {
      const assetType = await getFileType(path);
      setAssetType(assetType);
      onAssetTypeSwitch?.(assetType);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const Content = useCallback(() => {
    switch (assetType) {
      case AssetType.Image:
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
      case AssetType.Audio:
        return <audio src={path} controls={controls} autoPlay={autoPlay} />;
      case AssetType.Other:
      case AssetType.Video:
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
  }, [assetType, path, name, controls, autoPlay, width, height]);

  const assetTypes = Object.keys(AssetType)
    // @ts-ignore
    .map((key) => AssetType[key])
    .filter((value) => typeof value === 'string') as string[];

  return (
    <div
      className={
        'flex min-h-[240px] min-w-[320px] flex-col items-center justify-center text-white ' +
        className
      }
    >
      <Content />
      {showAssetTypeSwitcher && (
        <p className="text-sm">
          <span className="mr-2">
            Detected {AssetType[assetType]}, not correct?
          </span>

          <select
            className="text-sm text-black"
            defaultValue={AssetType[assetType]}
            value={AssetType[assetType]}
            onChange={(e) => {
              // @ts-ignore
              setAssetType(AssetType[e.target.value]);
              // @ts-ignore
              onAssetTypeSwitch?.(AssetType[e.target.value]);
            }}
          >
            {assetTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </p>
      )}
    </div>
  );
}

import { classnames } from 'tailwindcss-classnames';

import { NftCard } from '@/components/Nft';

import styles from './Items.module.scss';

const Item = ({ nfts }) => {
  return (
    <section id="item" className="h-full mt-10">
      <h5 className="text-center text-sm text-gray-200 ">All Items</h5>
      <h2 className="text-xl text-center text-[#4db5ff]">NFTs and More:</h2>
      <div className={classnames(styles.item__container)}>
        {nfts.map((nft) => (
          <NftCard key={`${nft.collectionId}-${nft.id}`} nft={nft} />
        ))}
      </div>
    </section>
  );
};

export default Item;

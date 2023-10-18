import Image from 'next/image';
import styles from './Items.module.scss';
import { classnames } from 'tailwindcss-classnames';

const Item = ({ showModal, nfts, setSelectedNft }) => {
  return (
    <section id="item" className="h-full mt-10">
      <h5 className="text-center text-sm text-gray-200 ">All Items</h5>
      <h2 className="text-xl text-center text-[#4db5ff]">NFTs and More:</h2>
      <div className={classnames(styles.item__container)}>
        {nfts.map((nft) => {
          return (
            <article
              key={`${nft.collectionId}-${nft.id}`}
              className={classnames(styles.item__item)}
            >
              <div className={classnames(styles.item__item__image)}>
                <Image
                  src={nft.assetUrl || '/images/items/item_1.png'}
                  alt={nft.name}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = '/images/items/item_1.png';
                  }}
                  width="400"
                  height="400"
                  className="min-h-[300px] object-cover"
                />
              </div>
              <h3>{nft.name}</h3>
              <div className={classnames(styles.item__item__cta)}>
                <button
                  onClick={() => {
                    setSelectedNft(nft);
                    showModal(true);
                  }}
                  className="py-2 px-4 text-base rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] hover:from-[#4ade80] hover:to-[#3b82f6]"
                  target="_blank"
                >
                  Transfer
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Item;

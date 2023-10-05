import Image from 'next/image';
import styles from './Items.module.scss';
import { classnames } from 'tailwindcss-classnames';
import IMG1 from '@/public/images/items/item_1.png';

const data = [
  {
    id: 1,
    asset_url: [IMG1],
    name: 'NFT 1',
  },
  {
    id: 2,
    asset_url: [IMG1],
    name: 'NFT 2',
  },
  {
    id: 3,
    asset_url: [IMG1],
    name: 'NFT 3',
  },
];

const Item = ({ showModal, nfts, setSelectedNft }) => {
  // if (!nfts || nfts == []) {
  //   nfts = data;
  // }
  nfts = data;
  console.log("NFTs are:");
  console.log(nfts);

  return (
    <section id="item" className="h-full mt-10">
      <h5 className="text-center text-sm text-gray-200 ">All Items</h5>
      <h2 className="text-xl text-center text-[#4db5ff]">NFTs and More:</h2>
      <div className={classnames(styles.item__container)}>
        {nfts.map(({ id, asset_url, name, description }) => {
          return (
            <article key={id} className={classnames(styles.item__item)}>
              <div className={classnames(styles.item__item__image)}>
                <Image
                  src={asset_url[0] ? asset_url[0] : '/images/items/item_1.png'}
                  alt={name}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = '/images/items/item_1.png';
                  }}
                  width="400"
                  height="400"
                  className="min-h-[300px] object-cover"
                />
              </div>
              <h3>{name}</h3>
              <div className={classnames(styles.item__item__cta)}>
                <button
                  onClick={() => {
                    setSelectedNft({ id, asset_url, name, description });
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

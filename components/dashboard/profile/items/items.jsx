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

const Item = ({ showModal, nfts }) => {
  if (!nfts || nfts == []) {
    nfts = data;
  }
  console.log(nfts);

  return (
    <section id="item" className="h-full mt-10">
      <h5 className="text-center text-sm text-gray-200 ">My Items</h5>
      <h2 className="text-xl text-center text-[#4db5ff]">Select One:</h2>
      <div className={classnames(styles.item__container)}>
        {nfts.map(({ id, asset_url, name, description }) => {
          return (
            <article key={id} className={classnames(styles.item__item)}>
              <div className={classnames(styles.item__item__image)}>
                <Image
                  src={asset_url[0] ? asset_url[0] : IMG1}
                  alt={name}
                  width="400"
                  height="400"
                />
              </div>
              <h3>{name}</h3>
              <div className={classnames(styles.item__item__cta)}>
                <button
                  onClick={() => showModal(true)}
                  className="py-2 px-4 rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] hover:from-[#4ade80] hover:to-[#3b82f6]"
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

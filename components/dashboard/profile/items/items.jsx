import Image from 'next/image';
import styles from './Items.module.scss';
import { classnames } from 'tailwindcss-classnames';
import IMG1 from '@/public/images/items/item_1.png';

const data = [
  {
    id: 1,
    image: IMG1,
    title: 'NFT',
  },
  {
    id: 2,
    image: IMG1,
    title: 'NFT',
  },
  {
    id: 3,
    image: IMG1,
    title: 'NFT',
  },
];

const Item = ({showModal}) => {

  return (
    <section id='item' className="h-full mt-10">
      <h5 className="text-center text-sm text-gray-200 ">My Items</h5>
      <h2 className="text-xl text-center text-[#4db5ff]">Select One:</h2>
      <div className={classnames(styles.item__container)}>
        {
          data.map(({id, image, title}) => {
            return (
              <article key={id} className={classnames(styles.item__item)}>
                <div className={classnames(styles.item__item__image)}>
                  <Image src={image} alt={title} width="400" height="400" />
                </div>
                <h3>{title}</h3>
                <div className={classnames(styles.item__item__cta)}>
                  <button onClick={() => showModal(true)} className='py-2 px-4 rounded-lg bg-gradient-to-r from-[#a855f7] to-[#3b82f6] hover:from-[#4ade80] hover:to-[#3b82f6]' target='_blank'>Transfer</button>
                </div>
              </article>
            );
          })
        }
      </div>
    </section>
  );
};

export default Item;
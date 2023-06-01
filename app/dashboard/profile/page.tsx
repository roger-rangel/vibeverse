'use client';

import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: '300',
  subsets: ['latin']
});

// import React, { useState } from 'react';
import About from '@/components/dashboard/profile/About';
import Portals from '@/components/dashboard/profile/Portals';

// import TransferNFT from '../Dashboard/components/TransferNFT';
// import {useLocation} from 'react-router-dom';

const ProfilePage = () => {
  //   const [transferPortal, setTransferPortal] = useState(false);
  //   const [portal, setPortal] = useState(0);
  //   const [imageUrl, setImageUrl] = useState("");

  //   const location = useLocation();

  //   console.log(location);

  //   const setSelectedPortal = (portalId, imageUrl) => {
  //     setTransferPortal(transferPortal => !transferPortal);
  //     setPortal(portalId);
  //     setImageUrl(imageUrl);
  //   };

  return (
    <>
      <div className={`${poppins.className} bg-[#1f1f38] text-white m-0 p-0 border-none outline-none box-border list-none no-underline scroll-smooth leading-7 profile`}>
        <About />
    
        {/* <Portals setSelectedPortal={setSelectedPortal} /> */}
        {/* The location.state.provider is not the whole provider object */}
        {/* <TransferNFT provider={location.state.provider} transferPortal={transferPortal} setTransferPortal={setTransferPortal} portalId={portal}/> */}
        {/* <TransferNFT transferPortal={transferPortal} setTransferPortal={setTransferPortal} portalId={portal} imageUrl={imageUrl}/>  */}
      </div>
    </>
  );
};

export default ProfilePage;
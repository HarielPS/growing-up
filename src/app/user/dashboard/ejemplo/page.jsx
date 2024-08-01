"use client";
import React, { useState } from 'react';
import WalletBalance from '@/component/web3/wallet/coin';

const Page = () => {
  const [value, setValue] = useState(0);

  const handleDivisa = (event) => {
    const inputValue = event.target.value;
    setValue(parseFloat(inputValue));
  };

  return (
    <div>
      <WalletBalance />
      <input type="number" onChange={handleDivisa} />
      <p>{`Cantidad ingresada: ${value}`}</p>
    </div>
  );
};

export default Page;

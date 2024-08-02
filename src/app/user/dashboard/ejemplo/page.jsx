"use client";
import React, { useState } from 'react';
import { Box } from '@mui/material';
import WalletConnect from '@/component/web3/wallet/WalletConnect';
import NetworkAndBalance from '@/component/web3/wallet/coin';

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);

  const handleWalletConnected = (walletName, walletAddress) => {
    console.log(`Wallet Connected: ${walletName} - ${walletAddress}`);
    setWalletConnected(true);
  };

  return (
    <Box sx={{ p: 4 }}>
      <WalletConnect onWalletConnected={handleWalletConnected} />
      {walletConnected && <NetworkAndBalance />}
    </Box>
  );
};

export default App;

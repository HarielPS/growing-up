"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, MenuItem, Select, Button } from '@mui/material';
import Web3 from 'web3';

const networks = [
  { name: 'Ethereum Mainnet', chainId: 1 },
  { name: 'Ropsten Testnet', chainId: 3 },
  { name: 'Kovan Testnet', chainId: 42 },
  { name: 'Rinkeby Testnet', chainId: 4 },
  { name: 'Goerli Testnet', chainId: 5 },
  // Agrega más redes si es necesario
];

const NetworkAndBalance = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0].chainId);
  const [balance, setBalance] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const storedAccount = localStorage.getItem('connectedWalletAddress');
    if (storedAccount) {
      setAccount(storedAccount);
    }
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      console.log('No Ethereum provider found. Install MetaMask.');
    }
  }, []);

  const handleNetworkChange = async (event) => {
    const chainId = event.target.value;
    setSelectedNetwork(chainId);
    if (web3) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(chainId) }],
        });
        fetchBalance();
      } catch (switchError) {
        console.error('Error switching network:', switchError);
      }
    }
  };

  const fetchBalance = async () => {
    if (web3 && account) {
      const balanceWei = await web3.eth.getBalance(account);
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
      setBalance(balanceEth);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Seleccionar Red</Typography>
      <Select
        value={selectedNetwork}
        onChange={handleNetworkChange}
        fullWidth
      >
        {networks.map((network) => (
          <MenuItem key={network.chainId} value={network.chainId}>
            {network.name}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" onClick={fetchBalance} sx={{ mt: 2 }}>
        Obtener Balance
      </Button>
      {balance !== null && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Balance: {balance} ETH
        </Typography>
      )}
    </Box>
  );
};

export default NetworkAndBalance;

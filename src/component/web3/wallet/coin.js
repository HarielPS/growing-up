"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Web3 from 'web3';

// Lista de redes conocidas
const NETWORKS = {
  1: 'Ethereum Mainnet',
  3: 'Ropsten Testnet',
  4: 'Rinkeby Testnet',
  5: 'Goerli Testnet',
  42: 'Kovan Testnet',
  10: 'Optimism',
  56: 'Binance Smart Chain',
  97: 'Binance Smart Chain Testnet',
  100: 'xDai',
  137: 'Polygon Mainnet',
  250: 'Fantom Opera',
  7000: 'ZetaChain Mainnet',
  1287: 'Moonbase Alpha',
  43114: 'Avalanche Mainnet',
  80001: 'Mumbai Testnet',
  42161: 'Arbitrum One',
  42220: 'Celo Mainnet',
  421614: 'Arbitrum Sepolia',
  // Agrega más redes según sea necesario
};

// Mapeo de denominaciones de moneda
const CURRENCIES = {
  1: 'ETH',
  3: 'ETH',
  4: 'ETH',
  5: 'ETH',
  42: 'ETH',
  10: 'ETH',
  56: 'BNB',
  97: 'BNB',
  100: 'xDai',
  137: 'MATIC',
  250: 'FTM',
  7000: 'ZETA',
  1287: 'DEV',
  43114: 'AVAX',
  80001: 'MATIC',
  42161: 'AETH',
  42220: 'CELO',
  421614: 'ETH',
  // Agrega más monedas según sea necesario
};

const getNetworkName = async (chainId) => {
  if (NETWORKS[chainId]) {
    return NETWORKS[chainId];
  }
  try {
    const response = await fetch(`https://chainlist.org/api/v1/chain/${chainId}`);
    const data = await response.json();
    return data.name || 'Unknown Network';
  } catch (error) {
    console.error('Error fetching network name:', error);
    return 'Unknown Network';
  }
};

const getCurrency = (chainId) => {
  return CURRENCIES[chainId] || 'Unknown Currency';
};

const NetworkAndBalance = () => {
  const [network, setNetwork] = useState(null);
  const [balance, setBalance] = useState(null);
  const [currency, setCurrency] = useState('ETH');
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
      fetchNetworkAndBalance(web3Instance, storedAccount);
    } else {
      console.log('No Ethereum provider found. Install MetaMask.');
    }
  }, []);

  const fetchNetworkAndBalance = async (web3Instance, account) => {
    if (web3Instance && account) {
      const chainId = await web3Instance.eth.getChainId();
      const networkName = await getNetworkName(chainId);
      const currencyName = getCurrency(chainId);
      const balanceWei = await web3Instance.eth.getBalance(account);
      const balanceEth = web3Instance.utils.fromWei(balanceWei, 'ether');

      setNetwork(`${networkName} (Chain ID: ${chainId})`);
      setBalance(balanceEth);
      setCurrency(currencyName);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Información de la Wallet</Typography>
      <Typography variant="body1">
        <strong>Red: </strong>{network}
      </Typography>
      <Typography variant="body1">
        <strong>Saldo: </strong>{balance} {currency}
      </Typography>
    </Box>
  );
};

export default NetworkAndBalance;

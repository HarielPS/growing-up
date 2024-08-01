"use client";
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "type": "function"
  }
];

const TOKEN_ADDRESSES = {
  'ZETA': '0xf091867ec603a6628ed83d274e835539d82e9cc8', // Reemplaza con la dirección del contrato del token ZETA
  'USDT': '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  'USDC': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606EB48',
  'DAI': '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  'LINK': '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  'UNI': '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  // Añade más tokens según sea necesario
};

const NETWORK_CURRENCY = {
  1: 'ETH', // Ethereum Mainnet
  137: 'MATIC', // Polygon
  7000: 'ZETA' // Reemplaza con el ID real de ZetaChain
  // Añade más redes y sus monedas correspondientes según sea necesario
};

const WalletBalance = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState('');
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      console.log('No Ethereum provider found. Install MetaMask.');
    }
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (web3 && walletAddress && currency) {
        if (currency === 'ETH' || currency === 'MATIC') {
          const balanceInWei = await web3.eth.getBalance(walletAddress);
          const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
          setBalance(balanceInEth);
        } else if (TOKEN_ADDRESSES[currency]) {
          const tokenContract = new web3.eth.Contract(ERC20_ABI, TOKEN_ADDRESSES[currency]);
          const balanceInToken = await tokenContract.methods.balanceOf(walletAddress).call();
          const decimals = await tokenContract.methods.decimals().call();
          const balanceInCorrectDecimals = balanceInToken / Math.pow(10, decimals);
          setBalance(balanceInCorrectDecimals);
        }
      }
    };

    if (walletAddress) {
      fetchBalance();
    }
  }, [web3, walletAddress, currency]);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setWalletAddress(account);
      localStorage.setItem('connectedWalletAddress', account);

      // Detectar automáticamente la red y moneda
      const networkId = await web3.eth.net.getId();
      const detectedCurrency = NETWORK_CURRENCY[networkId] || 'ETH';
      setCurrency(detectedCurrency);
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {walletAddress && currency && (
        <>
          <p>Connected Wallet: {walletAddress}</p>
          <p>Balance: {balance} {currency}</p>
        </>
      )}
    </div>
  );
};

export default WalletBalance;

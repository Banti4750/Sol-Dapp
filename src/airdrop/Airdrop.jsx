'use client';
import React, { useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState('');

  async function requestAirdrop() {
    if (!wallet.publicKey) {
      alert("Please connect your wallet first.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      await connection.requestAirdrop(wallet.publicKey, parsedAmount * LAMPORTS_PER_SOL);
      alert(`Airdropped ${parsedAmount} SOL to ${wallet.publicKey.toBase58()}`);
      setAmount('');
    } catch (error) {
      console.error("Airdrop failed:", error);
      alert("Airdrop failed. Please try again.");
    }
  }

  // Inline styles
  const mainContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40vh',
    padding: '30px',
    backgroundColor: '#0f1825',
    borderRadius: '10px',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    transition: 'background-color 0.3s',
  };

  const cardStyle = {
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    width: '300px',
    color: 'white',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#4CAF50',
    fontSize: '28px',
  };

  const inputContainerStyle = {
    marginBottom: '1rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#ddd',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    transition: 'border-color 0.3s',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s, transform 0.2s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
  };

  return (
    <div style={mainContainerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Request Airdrop</h2>
        <div style={inputContainerStyle}>
          <label htmlFor="amount" style={labelStyle}>Enter Amount:</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount in SOL"
            style={inputStyle}
          />
        </div>
        <button
          onClick={requestAirdrop}
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Request Airdrop
        </button>
      </div>
    </div>
  );
}

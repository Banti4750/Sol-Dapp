'use client'
import './sendtoken.css'; // Add this line at the top of your SendToken.js file

import React, { useState } from 'react';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import './sendtoken.css'; // Import the CSS file

export default function SendToken() {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function sendTokens() {
    if (!wallet.connected || !wallet.publicKey) {
      setError("Please connect your wallet first.");
      return;
    }

    if (!recipient || !amount) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(recipient),
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );

      await wallet.sendTransaction(transaction, connection);
      alert(`Sent ${amount} SOL to ${recipient}`);
      setRecipient('');
      setAmount('');
    } catch (err) {
      console.error("Error sending SOL:", err);
      setError("Failed to send SOL. Please check your inputs and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="send-token-container">
      <div className="send-token-card">
        <h2 className="send-token-title">Send SOL</h2>
        <div className="input-container">
          <label htmlFor="recipient" className="input-label">Recipient Public Key:</label>
          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Recipient's Public Key"
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label htmlFor="amount" className="input-label">Amount (SOL):</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount in SOL"
            className="input-field"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button
          onClick={sendTokens}
          disabled={isLoading || !wallet.connected}
          className={`send-button ${isLoading || !wallet.connected ? 'disabled' : ''}`}
        >
          {isLoading ? 'Sending...' : 'Send SOL'}
        </button>
      </div>
    </div>
  )
}

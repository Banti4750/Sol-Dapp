

import React, { useState } from 'react';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import './sendsol.css'; // Import the CSS file

export default function SendSol() {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [mintAddress, setMintAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function sendTokens() {
    if (!wallet.connected || !wallet.publicKey) {
      setError("Please connect your wallet first.");
      return;
    }

    if (!recipient || !amount || !mintAddress) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const toPublicKey = new PublicKey(recipient);
      const mintPublicKey = new PublicKey(mintAddress);

      const recipientTokenAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        toPublicKey
      );

      const transaction = new Transaction();

      transaction.add(
        createTransferInstruction(
          await getAssociatedTokenAddress(mintPublicKey, wallet.publicKey),
          recipientTokenAccount,
          wallet.publicKey,
          parseInt(amount) * (10 ** 9), // Adjust based on token's decimal
          [],
          TOKEN_PROGRAM_ID
        )
      );

      await wallet.sendTransaction(transaction, connection);
      alert(`Sent ${amount} tokens to ${recipient}`);
      setRecipient('');
      setAmount('');
      setMintAddress('');
    } catch (err) {
      console.error("Error sending tokens:", err);
      setError("Failed to send tokens. Please check your inputs and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="send-sol-container">
      <div className="send-sol-card">
        <h2 className="send-sol-title">Send Tokens</h2>
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
          <label htmlFor="amount" className="input-label">Amount:</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label htmlFor="mint" className="input-label">Token Address:</label>
          <input
            id="mint"
            type="text"
            value={mintAddress}
            onChange={(e) => setMintAddress(e.target.value)}
            placeholder="Token Mint Address"
            className="input-field"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button
          onClick={sendTokens}
          disabled={isLoading || !wallet.connected}
          className={`send-button ${isLoading || !wallet.connected ? 'disabled' : ''}`}
        >
          {isLoading ? 'Sending...' : 'Send Tokens'}
        </button>
      </div>
    </div>
  );
}

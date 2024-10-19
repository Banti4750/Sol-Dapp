'use client'

import React, { useState } from 'react';
import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import './signmessage.css'; // Import the CSS file

export default function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignMessage() {
    if (!publicKey) {
      setError('Wallet not connected!');
      return;
    }
    if (!signMessage) {
      setError('Wallet does not support message signing!');
      return;
    }
    if (!message) {
      setError('Please enter a message to sign.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSignature('');

    try {
      const encodedMessage = new TextEncoder().encode(message);
      const signatureBytes = await signMessage(encodedMessage);

      if (!ed25519.verify(signatureBytes, encodedMessage, publicKey.toBytes())) {
        throw new Error('Message signature invalid!');
      }

      const signatureBase58 = bs58.encode(signatureBytes);
      setSignature(signatureBase58);
    } catch (err) {
      console.error('Error signing message:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="sign-message-container">
      <div className="sign-message-card">
        <h2 className="sign-message-title">Sign Message</h2>
        <div className="input-container">
          <label htmlFor="message" className="input-label">Enter Message:</label>
          <input
            id="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message to sign"
            className="input-field"
          />
        </div>
        <button
          onClick={handleSignMessage}
          disabled={isLoading || !publicKey}
          className={`sign-button ${isLoading || !publicKey ? 'disabled' : ''}`}
        >
          {isLoading ? 'Signing...' : 'Sign Message'}
        </button>
        {error && (
          <p className="error-message">{error}</p>
        )}
        {signature && (
          <div className="signature-container">
            <h3 className="signature-title">Signature:</h3>
            <p className="signature">{signature}</p>
          </div>
        )}
      </div>
    </div>
  );
}

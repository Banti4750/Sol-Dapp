import './showsol.css'; // Import your CSS file for styling
import React, { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const Showsol = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [tokens, setTokens] = useState([]);
    const [solBalance, setSolBalance] = useState(null);

    // Fetch token accounts
    useEffect(() => {
        async function fetchTokenAccounts() {
            if (publicKey) {
                try {
                    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
                        programId: TOKEN_PROGRAM_ID,
                    });

                    const tokenData = tokenAccounts.value.map(account => {
                        const { mint, tokenAmount } = account.account.data.parsed.info;
                        return {
                            mint: new PublicKey(mint).toBase58(),
                            balance: tokenAmount.uiAmountString,
                        };
                    });

                    setTokens(tokenData);
                } catch (error) {
                    console.error('Error fetching token accounts:', error);
                }
            }
        }

        fetchTokenAccounts();
    }, [connection, publicKey]);

    // Fetch SOL balance
    useEffect(() => {
        async function getBalance() {
            if (publicKey) {
                try {
                    const balance = await connection.getBalance(publicKey);
                    setSolBalance(balance / LAMPORTS_PER_SOL);
                } catch (error) {
                    console.error('Error fetching SOL balance:', error);
                }
            }
        }

        getBalance();
    }, [connection, publicKey]);

    return (
        <div className='main-container'>
            <h1 className='title'>Wallet Balance</h1>
            <div className='sol-balance'>
                <h2>SOL Balance:</h2>
                <div className='balance'>{solBalance !== null ? `${solBalance} SOL` : 'Loading...'}</div>
            </div>
            <div className='token-balances'>
                <h2>Token Balances:</h2>
                {tokens.length > 0 ? (
                    tokens.map((token, index) => (
                        <div key={index} className='token-info'>
                            <div>Mint: {token.mint}</div>
                            <div>Balance: {token.balance} Token</div>
                        </div>
                    ))
                ) : (
                    <div>No tokens found.</div>
                )}
            </div>
        </div>
    );
};

export default Showsol;

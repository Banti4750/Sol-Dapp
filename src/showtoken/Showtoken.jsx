
import './shoetoken.css'
import React, { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { getAccount, getMint, TOKEN_PROGRAM_ID } from '@solana/spl-token';


const Showtoken = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        async function getBalance() {
            if (publicKey) {
                try {
                    // Fetch the token accounts
                    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
                        programId: TOKEN_PROGRAM_ID,
                    });

                    // If token accounts are found, get the balance of the first account
                    if (tokenAccounts.value.length > 0) {
                        const tokenAccount = tokenAccounts.value[0].account.data.parsed.info;
                        const balance = tokenAccount.tokenAmount.uiAmountString;
                        setBalance(balance);
                    } else {
                        setBalance('No token accounts found.');
                    }
                } catch (error) {
                    console.error('Error fetching token balance:', error);
                    setBalance('Error fetching token balance.');
                }
            }
        }

        getBalance();
    }, [connection, publicKey]);

    return (
        <div className='main-c'>
            
            <div>{balance !== null ? balance + " Token" : ""}</div>
        </div>
    );
}

export default Showtoken
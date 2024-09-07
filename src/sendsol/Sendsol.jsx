import React from 'react'
import './sendsol.css'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
    getAssociatedTokenAddress,
    createTransferInstruction,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";


const Sendsol = () => {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendTokens() {
        let to = document.getElementById("to").value;
        let amount = document.getElementById("amount").value;
        let mintAddress = document.getElementById("mint").value;

        const toPublicKey = new PublicKey(to);
        const mintPublicKey = new PublicKey(mintAddress);

        // Fetch the associated token account of the recipient
        const recipientTokenAccount = await getAssociatedTokenAddress(
            mintPublicKey,
            toPublicKey
        );

        const transaction = new Transaction();

        // Add token transfer instruction
        transaction.add(
            createTransferInstruction(
                await getAssociatedTokenAddress(mintPublicKey, wallet.publicKey), // sender's token account
                recipientTokenAccount,
                wallet.publicKey, // sender's public key
                amount * (10 ** 9), // adjust the amount according to the token's decimals
                [],
                TOKEN_PROGRAM_ID
            )
        );

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " tokens to " + to);
    }

    return (
        <>
            <div className="flexiii">
                <div className='main-container'>

                    <div className="d1">
                        <p>Recipient Public Key : </p>
                        <input id="to" type="text" placeholder="Recipient's Public Key" />
                    </div>

                    <div className="d2">
                        <p>Amount : </p>
                        <input id="amount" type="text" placeholder="Amount" />
                    </div>
                    <div className="d3">
                        <p>Token Address : </p>
                        <input id="mint" type="text" placeholder="Token Mint Address" />
                    </div>

                    <button className='sendsol-btn' onClick={sendTokens}>Send Tokens</button>
                </div>
            </div>
        </>
    );
}

export default Sendsol
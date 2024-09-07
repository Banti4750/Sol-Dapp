import React from 'react'
import './airdrop.css'
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Airdrop = () => {

    const wallet = useWallet();
    const { connection } = useConnection();

    async function requestAirdrop() {
        let amount = document.getElementById("amount").value;
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    }

    return (
        <>
        {/* <h1>Request Airdrop</h1> */}
        <div className='flexx'>

            <div className="containerr">
               
                <div className='amount'>
                    <p>Enter Amount : </p>
                    <input id="amount" type="text" placeholder="Amount" />

                </div>

                <button onClick={requestAirdrop} className='amount-btn'>Request Airdrop</button>

            </div>



        </div>

        </>
    )
}

export default Airdrop
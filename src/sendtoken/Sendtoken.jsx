import React from 'react'
import './sendtoken.css'
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";


const Sendtoken = () => {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendTokens() {
        let to = document.getElementById("to").value;
        let amount = document.getElementById("amount").value;
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + to);
    }

    return(
    <> 
    <div className="fleexii">
         <div className="contan">
            <div className="c1">
                <p>Recipient Public Key : </p>
                <input id="to" type="text" placeholder="Public Key" />
            </div>

            <div className="c2">
                <p>Amount : </p>
                <input id="amount" type="text" placeholder="Amount" />
            </div>

            <button className='sendtoken-btn' onClick={sendTokens}>Send</button>
         </div>


        </div>
    </>
    )
}

export default Sendtoken
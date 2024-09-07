import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import './showsol.css'

const  Showsol=()=> {
    const { connection } = useConnection();
    const wallet = useWallet();

    async function getBalance() { 
        if (wallet.publicKey) {

            const balance = await connection.getBalance(wallet.publicKey);
            document.getElementById("balance").innerHTML = balance / LAMPORTS_PER_SOL + " SOL";
        }
    }
    
    getBalance();
    return <div  className="container">
         <button id="balance"> </button>
    </div>
}

export default Showsol

import React, { FC, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import Showsol from '../showsol/Showsol';



const Main = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
   
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
         
            
          
            {/* <Showtoken/> */}
            <div style={{display:'flex'}}>
              <WalletMultiButton style={{ margin: '20px' }} />
              <WalletDisconnectButton style={{ margin: '20px' }} />
            </div>
            <Showsol/>

            
        
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    
  );
}

export default Main
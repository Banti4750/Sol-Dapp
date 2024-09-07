
import './App.css';
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
import Navbar from './navbar/Navbar';
// import Showsol from './showsol/Showsol';
// import Showtoken from './showtoken/Showtoken';
import Airdrop from './airdrop/Airdrop';
import Main from './main/Main'
import Sendsol from './sendsol/Sendsol';
import Sendtoken from './sendtoken/Sendtoken';
import Signmessage from './signmessage/Signmessage';

const App = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (

    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Router>
            <Navbar />
           
          

            {/* <Showsol />
            <Showtoken />
            <div className='main-cont'>
              <WalletMultiButton style={{ margin: '20px' }} />
              <WalletDisconnectButton style={{ margin: '20px' }} />
            </div> */}

            <Routes>
              {/* Define your routes */}

              <Route path="/" element={<Main />} />
              <Route path="/airdrop" element={<Airdrop />} />
              <Route path="/sendsol" element={ <Sendsol />} />
              <Route path="/sendtoken" element={  <Sendtoken/>} />
              <Route path="/signmessage" element={   <Signmessage/>} />
            </Routes>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>

  );
}

export default App
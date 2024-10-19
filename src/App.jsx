'use client'

import React, { useMemo } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider, WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'

import '@solana/wallet-adapter-react-ui/styles.css'

import Layout from './Layout'
import Navbar from './navbar/Navbar'
import Airdrop from './airdrop/Airdrop'
import Main from './main/Main'
import Sendsol from './sendsol/Sendsol'
import Sendtoken from './sendtoken/Sendtoken'
import Signmessage from './signmessage/Signmessage'
import Createtoken from './createtoken/Createtoken'
import Footer from './Footer/Footer'

export default function App() {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Router>
            <Layout>
              <Navbar />
              <main style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                {/* <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <WalletMultiButton style={{ margin: '0 10px' }} />
                  <WalletDisconnectButton style={{ margin: '0 10px' }} />
                </div> */}
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/airdrop" element={<Airdrop />} />
                  <Route path="/sendsol" element={<Sendsol />} />
                  <Route path="/sendtoken" element={<Sendtoken />} />
                  <Route path="/signmessage" element={<Signmessage />} />
                  <Route path="/createtoken" element={<Createtoken />} />
                </Routes>
              
              </main>
            </Layout>
          </Router>
          <Footer/>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
     
  )
}
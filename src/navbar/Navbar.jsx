import React from 'react'
import './navbar.css'

const Navbar = () => {
    return (
        <>
            <div className='main'>

                <h2>DAPP</h2>
                <div className='all-route'>
                   <ul>
                   <a href="/"><li>Home</li></a>
                    <a href="/airdrop"><li> Airdrop++</li></a>
                    <a href="/sendsol"><li>SendSol</li></a>
                    <a href="/sendtoken"><li>SendToken</li></a>
                    <a href="/signmessage"><li>SignMessage</li></a>
                    
                   </ul>
                </div>
            </div>


        </>
    )
}

export default Navbar
import { Inter } from 'next/font/google'
import { useWalletTokenBalance } from '@lndgalante/solutils';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import dynamic from 'next/dynamic'
import Button from '@/components/Button'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

function Home() {

  const { publicKey } = useWallet();
  const { connection } = useConnection();
 
  // solutils hooks
  const { getWalletTokenBalance, result, status, error } = useWalletTokenBalance(publicKey, connection);
 
  // handlers
  function handleWalletBalanceRequest() {
    getWalletTokenBalance('SOL');
  }

  const CardData = () => [
    {
      cardName: "Dragon",
      cardImage: "https://i.im.ge/2024/04/06/W8YsTY.cardfront-armor-gray.jpeg",
      cardTradingBalance: "0.3",
      cardTradingCurrency: "SOL",
      cardTradeDate: "6/4/2024",
      cardTrader: "Ali",
    }
  ]

  return (
    <main
      className={`flex min-h-screen flex-col h-full overflow-x-hidden`}
    >
      <nav className="z-10 w-full items-center pb-4 border-b-2 border-white justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 ml-4 mt-4 flex w-full justify-center border-b font-Caveat font-extrabold border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          SolSummoner
        </p>
        <div className="fixed bottom-0 left-0 mr-4 mt-4 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <WalletMultiButton />
        </div>
      </nav>
      
      <div className='flex gap-3 w-full h-full bg-slate-200'>
        <div className='h-[500px] w-1/4 bg-gray-400 my-3 rounded-r-xl flex-shrink-0 mt-3 inset-2'>

        </div>
        <div className='h-full grid grid-cols-3 gap-3 pt-3'>
          {CardData().map((card) => (
            <div className='w-[300px] h-[400px] bg-white border-2 rounded-xl shadow-xl flex-shrink-0 relative items-center justify-center overflow-hidden box hover:cursor-pointer' key={card.cardTrader}>
              <Image alt="Gray Armor" src={card.cardImage} width={300} height={400} className='w-full h-full rounded-xl blur-md'></Image>
              <Image alt="Gray Armor" src={card.cardImage} width={250} height={350} className='w-[90%] h-[90%] rounded-xl absolute top-0 left-0 secondImage'></Image>
              <div className='w-[95%] m-2 h-[150px] text-white bg-gray-500 border-2 rounded-lg flex flex-col font-Tilt justify-center flex-shrink-0 border-slate-600 relative slide'>
                <div className=' text-center'>
                  {card.cardName}
                </div>
                <div className=' text-center'>
                  {card.cardTradingBalance} {card.cardTradingCurrency}
                </div>
                <div className='absolute bottom-0 left-0 ml-1 mb-1 font-Oswald text-xs'>
                  {card.cardTradeDate}
                </div>
                <div className='absolute bottom-0 right-0 mr-1 mb-1 font-Oswald text-xs'>
                  {card.cardTrader}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex items-center fixed right-0 bottom-[40%] w-[320px] h-[250px] translate-x-[300px] showBalance font-Oswald'>
          <button className='font-Oswald rounded-full w-[40px] h-[40px] pr-8 absolute left-0 text-white bg-black' type="button">
            《
          </button>
          <div className='w-[300px] border-2 border-black rounded-2xl ml-[30px] bg-slate-200 h-full flex-col flex justify-center items-center'>
            {publicKey ? <div className='place-items-center grid'>
            <Button onClick={handleWalletBalanceRequest}>Request Wallet Balance</Button>
            {status === 'iddle' ? <p>Haven&apos;t requested any SOL balance yet</p> : null}
            {status === 'loading' ? <p>Requesting your SOL balance tokens</p> : null}
            {status === 'success' ? <p>We successfully got your balance: {result} SOL</p> : null}
            {status === 'error' ? <p>{error}</p> : null}
            </div> : null}
          </div>
        </div>
      </div>
    </main>
  )
}

export default dynamic (() => Promise.resolve(Home), {ssr: false} )

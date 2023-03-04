import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
//import styles from '@/styles/Home.module.css'
//import styles from 'styles/globals.css'
import { useState } from 'react'
import { NFTCard } from './components/nftCard'


//home page
//search box
//key component displaying NFT cards

//next step switch check box from 

export default function Home() {
  const [wallet, setWalletAddress] = useState("")
  const [collection, setCollectionAddress] = useState("")
  const [NFTs, setNFTs] = useState([])
  const [fetchforCollection, setFectchforCollection] = useState(true);

  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts")
    //console.log(process.env.NEXT_PUBLIC_API_KEY)

    const api_key = process.env.NEXT_PUBLIC_API_KEY //.ENV
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`; //.ENV
    var requestOptions = {
          method: 'GET',
          /*redirect: 'follow'*/
        };
     
   
    

    if(!collection.length){ //verify empty
        //if theres no NFTs in collection array then fetch collection with the owner id
        
 
        
        const fetchURL = `${baseURL}?owner=${wallet}`; //.ENV
 
        
        nfts = await fetch(fetchURL, requestOptions).then(data => data.json())


     }else{
      
      console.log("fetching nfts for specific collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())


     }

    if(nfts){
      //after fetching if no NFTs add them to the list
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
      
      
     }

     
  }

  const fetchNFTSForCollection = async () => {
    console.log("fetching nft collection")
    if(collection.length){ //verify collection address not null
      const api_key = process.env.NEXT_PUBLIC_API_KEY //.ENV

      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${api_key}/getNFTsForCollection/`; //.ENV
      var requestOptions = {
          method: 'GET',
          /*redirect: 'follow'*/
        };

      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;

      
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
          console.log("NFTs in collection:", nfts)
          setNFTs(nfts.nfts)
      }
     
      

    }

  }

  return (
    
       
       <div className="flex flex-col items-center justify-center py-8 gap-y-3">
       <div className="flex flex-col w-full justify-center items-center gap-y-2">
          <input disabled={fetchforCollection} onChange={(e)=>{setWalletAddress(e.target.value)}} type={"text"} placeholder="add your wallet address"></input>


          {/*wallet addess disabled when fetching only collection */}
          <input  onChange={(e)=>{setCollectionAddress(e.target.value)}}  type={"text"} placeholder="add your collection address"></input>

          <label><input onChange={(e)=>{setFectchforCollection(e.target.checked)}} type={"checkbox"}></input>Fetch for collection</label>
          <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
            () =>{
              console.log(fetchforCollection)
              
              //conditional response based on check box result
              if(fetchforCollection){
                fetchNFTSForCollection()   
              }else{
                fetchNFTs()   
              }

            }

          }> Let's go</button>
        </div>
        <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center"> {/*'flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'*/}
          

        {
          NFTs.length && NFTs.map(nft => {
            return (
              
              <NFTCard key={nft.id.tokenId} nft={nft}></NFTCard>
              
            )
          })
        }
          
        </div>

        </div>
      
      
    
  )
}

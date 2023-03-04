

export const NFTCard = ({ nft }) => {
    //calling NFT in App and passing it into card component
    return(
        <div className="w-1/4 flex flex-col">
             <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} ></img>
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-gray-900 rounded-b-md h-110 ">
            <div>
                <h2>{nft.title}</h2>
                <p>{nft.id.tokenId.substr(nft.id.tokenId.length-4)}</p> {/*Id returned nex string so shorten to last 4*/}
                <p>{`${nft.contract.address.substr(0,4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
            </div>
            <div className="flex-grow mt-2">
                <p >{nft.description?.substr(0,150)}</p>
                {/*<p >{nft.description}</p>*/}
            </div>
            <div>
              <a target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`}> View on Etherscan</a>  
            </div>
            </div>
        </div>
    )

}
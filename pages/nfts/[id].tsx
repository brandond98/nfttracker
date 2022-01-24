import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { useTokenPrice } from 'react-moralis';
import { useAppSelector } from 'state/hooks';
import Button from '../../components/button';
import dollarValue from '../../helpers/dollarValue';

const NFTDetailPage = () => {
  const { fetchTokenPrice, data: formattedData } = useTokenPrice({
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    chain: 'eth',
  });

  useEffect(() => {
    fetchTokenPrice();
  }, [fetchTokenPrice]);

  const nfts = useAppSelector((state) => state.nft);
  const router = useRouter();
  const { id } = router.query;
  const nft = nfts.length && nfts.find((nft) => nft.id === parseInt(id));
  const currentPrice =
    nft.sell_orders && nft.sell_orders[0].current_price.slice(0, 3);

  const currentDollarValue =
    formattedData && dollarValue(formattedData.usdPrice, currentPrice);

  const lastSale = +nft.last_sale.payment_token.eth_price;
  const lastDollarValue =
    formattedData && dollarValue(formattedData.usdPrice, lastSale);

  return nft ? (
    <div className="mx-44">
      <Button
        text="Go Back"
        click={() => router.back()}
        classNames="mb-7"
       />
      <div className="flex justify-between ">
        <div className="mr-10 ">
          <Image
            alt="nft image"
            src={nft.image_url || nft.collection.featured_image_url}
            width={400}
            height={400}
            className="rounded-lg"
           />
        </div>
        <div className="flex-1 ">
          <h1 className="text-3xl text-white mb-5">{nft.name}</h1>
          <div className="text-gray-400 border border-gray-500 h-fit rounded-lg p-5 mb-5">
            <h2 className="mb-3 text-lg">Current Price</h2>
            <div className="flex items-center text-white mb-5">
              <FaEthereum className="mr-1 text-3xl" />
              <div className="text-3xl mr-3">
                {currentPrice || 'Not For Sale'}
              </div>
              <div className="text-gray-400">
                {currentPrice && `($${currentDollarValue})`}
              </div>
            </div>
            <h2 className="mb-3 text-lg">Last Sale Price</h2>
            <div className="flex items-center text-white mb-5">
              <FaEthereum className="mr-1 text-3xl" />
              <div className="text-3xl mr-3">
                {lastSale || 'No last sale'}
              </div>
              <div className="text-gray-400">
                {lastSale && `($${lastDollarValue})`}
              </div>
            </div>
          </div>
          <div className="text-gray-400 border border-gray-500 h-fit rounded-lg p-5">
            <h2 className="mb-3 text-lg">Created By</h2>
            <div className="flex items-center mb-3">
              <div className="mr-2 ">
                <Image
                  alt="creator-image"
                  src={nft.creator.profile_img_url}
                  width={30}
                  height={30}
                  className="rounded-full"
                 />
              </div>
              <a
                href={`https://rinkeby.etherscan.io/address/${nft.creator.address}`}
                className="mb-1 text-blue-500"
              >
                {nft.creator.address}
              </a>
            </div>
            <h2 className="mb-3 text-lg">Description</h2>
            <p className="text-white text-base leading-6">{nft.description}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>No NFT found</div>
  );
};

export default NFTDetailPage;
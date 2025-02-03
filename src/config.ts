import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Common configuration shared between different chains.
 */
const commonConfig = {
  use_local_images: false,
  collection_name: 'Abstractors',
  currency: 'ETH',
  traits: {
    enabled: true,
    maxTraits: 25,
    excludeTraitTypes: ['Background'],
    sortBy: ['Fur', 'Mouth', 'Eyes', 'Clothes', 'Head'],
    discord: {
      format: '{trait_type}: {value}',
      separator: '\n',
      placement: '{traits}',
      maxTraits: 25
    },
    twitter: {
      format: '• {trait_type}: {value}',
      separator: '\n',
      placement: '\n{traits}',
      maxTraits: 15,
      maxCharacters: 170
    }
  },
  tweetFilters: {
    enabled: false,
    minBulkPurchaseCount: 1,
    minSingleSalePrice: {
      ape: "0",
      wape: "0"
    },
    skipBulkWapeSales: false,
  },
  debug_mode: false
};

/**
 * Discord message configuration using placeholders from commonConfig.
 */
const discordMessageConfig = {
  channels: [
    {
      id: process.env.DISCORD_CHANNEL_ID,
      name: 'main'
    },
    {
      id: process.env.DISCORD_ANNOUNCEMENTS_ID,
      name: 'announcements'
    }
  ],
  buyMessage: {
    color: '#0054FA',
    title: '🔥 **BUY ALERT!**',
    description: `🎉 **${commonConfig.collection_name} #{tokenId}** has been bought for **{price} ${commonConfig.currency}** on **{marketplace}**!\n[View NFT](<{itemUrl}>)`,
  },
  saleMessage: {
    color: '#E74C3C',
    title: '🔥 **SALE ALERT!**',
    description: `💸 **${commonConfig.collection_name} #{tokenId}** has been sold for **{price} W${commonConfig.currency}** on **{marketplace}**!\n[View NFT](<{itemUrl}>)`,
  },
  bulkBuyMessage: {
    color: '#28A745',
    title: '🔥 **SWEEP ALERT!**',
    description: `🛒 **{count} ${commonConfig.collection_name} NFTs** bought for a total of **{totalPrice} ${commonConfig.currency}**!\n📊 Average price: **{avgPrice} ${commonConfig.currency}** per NFT.\n[View Transaction](<{txUrl}>)`,
  },
  bulkSaleMessage: {
    color: '#FFC107',
    title: '🔥 **BULK SALE ALERT!**',
    description: `📤 **{count} ${commonConfig.collection_name} NFTs** sold for a total of **{totalPrice} W${commonConfig.currency}**!\n📊 Average price: **{avgPrice} ${commonConfig.currency}** per NFT.\n[View Transaction](<{txUrl}>)`,
  },
  footerText: `${commonConfig.collection_name} Sales Bot`,
};

/**
 * Twitter message configuration using placeholders from commonConfig.
 */
const twitterMessageConfig = {
  saleMessage: `🔵🦍 ${commonConfig.collection_name} #{tokenId} bought for {price} ${commonConfig.currency} on {marketplace} 🛒✨\n\n{traits}\n\n🔗 {itemUrl}`,
  wapeSaleMessage: `🔵🦍 ${commonConfig.collection_name} #{tokenId} sold for {price} W${commonConfig.currency} on {marketplace} 💰✨\n\n{traits}\n\n🔗 {itemUrl}`,
  bulkSaleMessage: `🔵🦍 {count} ${commonConfig.collection_name} bought for {totalPrice} ${commonConfig.currency} on {marketplace} (avg. {avgPrice} ${commonConfig.currency}) 📦💎\n\n🔗 {txUrl}`,
  bulkWapeSaleMessage: `🔵🦍 {count} ${commonConfig.collection_name} sold for {totalPrice} W${commonConfig.currency} on {marketplace} (avg. {avgPrice} ${commonConfig.currency}) 📦💰\n\n🔗 {txUrl}`
};

/**
 * Configuration specific to the Apechain network.
 */
const apechainConfig = {
  ...commonConfig,
  discord: discordMessageConfig,
  twitter: twitterMessageConfig,
  contract_address: '0xa6bAbE18F2318D2880DD7dA3126C19536048F8B0',
  contract_deployment_block: 7832296,
  token_id_offset: 1,
  image_api_url: 'APECHAIN_METADATA_BASE_URL',
  marketplaces: {
    magiceden: {
      name: 'Magic Eden',
      addresses: [
        '0x0000000000000068F116a894984e2DB1123eB395',
        '0x1d3a594EAf472ca2ceC2A8aE44478c06d6A37E22',
        '0x224ecB4Eae96d31372D1090c3B0233C8310dBbaB'
      ],
      icon: './platform_images/magiceden.png',
      item_url: 'https://magiceden.io/item-details/apechain/{contract}/{tokenId}'
    }
  },
  explorer: {
    tx_url: 'https://apescan.io/tx/{txHash}'
  }
};

/**
 * Configuration specific to the Abstract network.
 */
const abstractConfig = {
  ...commonConfig,
  discord: discordMessageConfig,
  twitter: twitterMessageConfig,
  contract_address: '0x59eec556cef447e13edf4bfd3d4433d8dad8a7a5',
  contract_deployment_block: 593422, // Replace with the actual deployment block
  token_id_offset: 0,
  image_api_url: 'https://metadata.abstract.xyz/{contract}/{tokenId}',
  marketplaces: {
    magiceden: {
      name: 'Magic Eden',
      addresses: [
        '0x71B6E4337350A9a30b8D3F52E3BdE7adEBDCb19c',
        '0xDF3969A315e3fC15B89A2752D0915cc76A5bd82D',
        '0xE41cdAE209E91383d7adC7dB030E9aF5DDC43882'
      ],
      icon: './platform_images/magiceden.png',
      item_url: 'https://magiceden.io/item-details/abstract/{contract}/{tokenId}'
    }
  },
  explorer: {
    tx_url: 'https://abscan.org/tx/{txHash}'
  }
};

/**
 * Export the configuration based on the CHAIN environment variable.
 */
const config = process.env.CHAIN === 'abstract' ? abstractConfig : apechainConfig;

export default config;
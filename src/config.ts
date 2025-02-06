
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Common configuration shared between different chains.
 */

const commonConfig = {
  use_local_images: false,
  collection_name: 'Apes on Ape',
  currency: 'APE',
  rpc_url: 'https://apechain.drpc.org',
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
 * Configuration specific to the selected network.
 */

const apechainConfig = {
  ...commonConfig,
  discord: discordMessageConfig,
  twitter: twitterMessageConfig,
  contract_address: '0xa6babe18f2318d2880dd7da3126c19536048f8b0',
  contract_deployment_block: 7832296,
  token_id_offset: 1,
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
 * Export the configuration based on the selected chain.
 */

const config = apechainConfig;

export default config;


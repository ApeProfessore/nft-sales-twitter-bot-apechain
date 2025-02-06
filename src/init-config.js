const fs = require('fs');
const inquirer = require('inquirer');

const questions = [
  {
    type: 'list',
    name: 'chain',
    message: 'Select the blockchain network:',
    choices: ['apechain', 'abstract']
  },
  {
    type: 'input',
    name: 'collection_name',
    message: 'Enter the collection name:',
    default: 'Apes on Ape'
  },
  {
    type: 'input',
    name: 'currency',
    message: 'Enter the currency:',
    default: 'APE'
  },
  {
    type: 'input',
    name: 'contract_address',
    message: 'Enter the contract address:',
    default: '0xa6babe18f2318d2880dd7da3126c19536048f8b0'
  },
  {
    type: 'input',
    name: 'rpc_url',
    message: 'Enter the RPC URL:',
    default: 'https://apechain.drpc.org'
  },
  {
    type: 'input',
    name: 'contract_deployment_block',
    message: 'Enter the contract deployment block:',
    default: 7832296
  },
  {
    type: 'input',
    name: 'token_id_offset',
    message: 'Enter the token ID offset:',
    default: 1
  }
];

inquirer.prompt(questions).then(answers => {
  const { chain, collection_name, currency, contract_address, rpc_url, contract_deployment_block, token_id_offset } = answers;

  const commonConfig = `
const commonConfig = {
  use_local_images: false,
  collection_name: '${collection_name}',
  currency: '${currency}',
  rpc_url: '${rpc_url}',
  traits: {
    enabled: true,
    maxTraits: 25,
    excludeTraitTypes: ['Background'],
    sortBy: ['Fur', 'Mouth', 'Eyes', 'Clothes', 'Head'],
    discord: {
      format: '{trait_type}: {value}',
      separator: '\\n',
      placement: '{traits}',
      maxTraits: 25
    },
    twitter: {
      format: '• {trait_type}: {value}',
      separator: '\\n',
      placement: '\\n{traits}',
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
`;

  const discordMessageConfig = `
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
    description: \`🎉 **\${commonConfig.collection_name} #{tokenId}** has been bought for **{price} \${commonConfig.currency}** on **{marketplace}**!\\n[View NFT](<{itemUrl}>)\`,
  },
  saleMessage: {
    color: '#E74C3C',
    title: '🔥 **SALE ALERT!**',
    description: \`💸 **\${commonConfig.collection_name} #{tokenId}** has been sold for **{price} W\${commonConfig.currency}** on **{marketplace}**!\\n[View NFT](<{itemUrl}>)\`,
  },
  bulkBuyMessage: {
    color: '#28A745',
    title: '🔥 **SWEEP ALERT!**',
    description: \`🛒 **{count} \${commonConfig.collection_name} NFTs** bought for a total of **{totalPrice} \${commonConfig.currency}**!\\n📊 Average price: **{avgPrice} \${commonConfig.currency}** per NFT.\\n[View Transaction](<{txUrl}>)\`,
  },
  bulkSaleMessage: {
    color: '#FFC107',
    title: '🔥 **BULK SALE ALERT!**',
    description: \`📤 **{count} \${commonConfig.collection_name} NFTs** sold for a total of **{totalPrice} W\${commonConfig.currency}**!\\n📊 Average price: **{avgPrice} \${commonConfig.currency}** per NFT.\\n[View Transaction](<{txUrl}>)\`,
  },
  footerText: \`\${commonConfig.collection_name} Sales Bot\`,
};
`;

  const twitterMessageConfig = `
const twitterMessageConfig = {
  saleMessage: \`🔵🦍 \${commonConfig.collection_name} #{tokenId} bought for {price} \${commonConfig.currency} on {marketplace} 🛒✨\\n\\n{traits}\\n\\n🔗 {itemUrl}\`,
  wapeSaleMessage: \`🔵🦍 \${commonConfig.collection_name} #{tokenId} sold for {price} W\${commonConfig.currency} on {marketplace} 💰✨\\n\\n{traits}\\n\\n🔗 {itemUrl}\`,
  bulkSaleMessage: \`🔵🦍 {count} \${commonConfig.collection_name} bought for {totalPrice} \${commonConfig.currency} on {marketplace} (avg. {avgPrice} \${commonConfig.currency}) 📦💎\\n\\n🔗 {txUrl}\`,
  bulkWapeSaleMessage: \`🔵🦍 {count} \${commonConfig.collection_name} sold for {totalPrice} W\${commonConfig.currency} on {marketplace} (avg. {avgPrice} \${commonConfig.currency}) 📦💰\\n\\n🔗 {txUrl}\`
};
`;

  const specificConfig = chain === 'apechain' ? `
const apechainConfig = {
  ...commonConfig,
  discord: discordMessageConfig,
  twitter: twitterMessageConfig,
  contract_address: '${contract_address}',
  contract_deployment_block: ${contract_deployment_block},
  token_id_offset: ${token_id_offset},
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
` : `
const abstractConfig = {
  ...commonConfig,
  discord: discordMessageConfig,
  twitter: twitterMessageConfig,
  contract_address: '${contract_address}',
  contract_deployment_block: ${contract_deployment_block},
  token_id_offset: ${token_id_offset},
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
`;

  const configExport = `
const config = ${chain === 'apechain' ? 'apechainConfig' : 'abstractConfig'};

export default config;
`;

  const configContent = `
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Common configuration shared between different chains.
 */
${commonConfig}

/**
 * Discord message configuration using placeholders from commonConfig.
 */
${discordMessageConfig}

/**
 * Twitter message configuration using placeholders from commonConfig.
 */
${twitterMessageConfig}

/**
 * Configuration specific to the selected network.
 */
${specificConfig}

/**
 * Export the configuration based on the selected chain.
 */
${configExport}
`;

  fs.writeFileSync('src/config.ts', configContent);
  console.log('Configuration file created successfully!');
});
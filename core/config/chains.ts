import type { AddEthereumChainParameter } from "@web3-react/types";

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

const BSC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Binance",
  symbol: "BNB",
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation)?.nativeCurrency;
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

export const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
} = {
  1: {
    urls: [
      process.env.infuraKey
        ? `https://mainnet.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      process.env.alchemyKey
        ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.alchemyKey}`
        : undefined,
      "https://cloudflare-eth.com",
    ].filter((url): url is string => url !== undefined),
    name: "Mainnet",
  },
  3: {
    urls: [
      process.env.infuraKey
        ? `https://ropsten.infura.io/v3/${process.env.infuraKey}`
        : undefined,
    ].filter((url): url is string => url !== undefined),
    name: "Ropsten",
  },
  4: {
    urls: [
      process.env.infuraKey
        ? `https://rinkeby.infura.io/v3/${process.env.infuraKey}`
        : undefined,
    ].filter((url): url is string => url !== undefined),
    name: "Rinkeby",
  },
  5: {
    urls: [
      process.env.infuraKey
        ? `https://goerli.infura.io/v3/${process.env.infuraKey}`
        : undefined,
    ].filter((url): url is string => url !== undefined),
    name: "Görli",
  },
  42: {
    urls: [
      process.env.infuraKey
        ? `https://kovan.infura.io/v3/${process.env.infuraKey}`
        : undefined,
    ].filter((url): url is string => url !== undefined),
    name: "Kovan",
  },
  // Optimism
  10: {
    urls: [
      process.env.infuraKey
        ? `https://optimism-mainnet.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      "https://mainnet.optimism.io",
    ].filter((url): url is string => url !== undefined),
    name: "Optimistic Ethereum",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
  },
  69: {
    urls: [
      process.env.infuraKey
        ? `https://optimism-kovan.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      "https://kovan.optimism.io",
    ].filter((url): url is string => url !== undefined),
    name: "Optimistic Kovan",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://kovan-optimistic.etherscan.io"],
  },
  // Arbitrum
  42161: {
    urls: [
      process.env.infuraKey
        ? `https://arbitrum-mainnet.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      "https://arb1.arbitrum.io/rpc",
    ].filter((url): url is string => url !== undefined),
    name: "Arbitrum One",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://arbiscan.io"],
  },
  421611: {
    urls: [
      process.env.infuraKey
        ? `https://arbitrum-rinkeby.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      "https://rinkeby.arbitrum.io/rpc",
    ].filter((url): url is string => url !== undefined),
    name: "Arbitrum Testnet",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://testnet.arbiscan.io"],
  },
  // Polygon
  137: {
    urls: [
      process.env.infuraKey
        ? `https://polygon-mainnet.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      "https://polygon-rpc.com",
    ].filter((url): url is string => url !== undefined),
    name: "Polygon Mainnet",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  80001: {
    urls: [
      process.env.infuraKey
        ? `https://polygon-mumbai.infura.io/v3/${process.env.infuraKey}`
        : undefined,
    ].filter((url): url is string => url !== undefined),
    name: "Polygon Mumbai",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
  // Binance
  56: {
    urls: ['https://bsc-dataseed.binance.org/'].filter((url) => url !== undefined),
    name: "Binance",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://bscscan.com"],
  },
  97: {
    urls: [
      'https://data-seed-prebsc-2-s3.binance.org:8545'].filter((url) => url !== undefined),
    name: "Binance Testnet",
    nativeCurrency: BSC,
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
  },
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});

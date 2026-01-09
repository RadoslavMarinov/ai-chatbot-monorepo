import { z } from "zod";

export const CryptoSymbolEnumZod = z.enum([
  "BTC", // Bitcoin
  "ETH", // Ethereum
  "USDT", // Tether
  "BNB", // Binance Coin
  "XRP", // Ripple
  "ADA", // Cardano
  "SOL", // Solana
  "DOGE", // Dogecoin
  "DOT", // Polkadot
  "MATIC", // Polygon
  "LTC", // Litecoin
  "UNI", // Uniswap
  "AVAX", // Avalanche
  "SHIB", // Shiba Inu
  "LINK", // Chainlink
  "BCH", // Bitcoin Cash
  "TRX", // TRON
  "XLM", // Stellar
  "ETC", // Ethereum Classic
  "FIL", // Filecoin
  "ICP", // Internet Computer
  "VET", // VeChain
  "THETA", // Theta Network
  "EOS", // EOS
  "AAVE", // Aave
  "MKR", // Maker
  "ATOM", // Cosmos
  "XTZ", // Tezos
  "NEO", // Neo
  "IOTA", // IOTA
  "MONERO", // Monero
  "DASH", // Dash
  "ZEC", // Zcash
  "NEM", // NEM
  "ONT", // Ontology
  "WAVES", // Waves
  "BAT", // Basic Attention Token
  "ENJ", // Enjin Coin
  "OMG", // OMG Network
  "ZIL", // Zilliqa
  "KSM", // Kusama
  "SNX", // Synthetix
  "COMP", // Compound
  "SUSHI", // SushiSwap
  "YFI", // yearn.finance
  "GRT", // The Graph
  "CHZ", // Chiliz
  "MANA", // Decentraland
  "SAND", // The Sandbox
  "AXS", // Axie Infinity
  "FTM", // Fantom
  "ONE", // Harmony
  "ALGO", // Algorand
  "HBAR", // Hedera
  "EGLD", // Elrond
  "FLOW", // Flow
  "NEAR", // NEAR Protocol
  "APT", // Aptos
  "OP", // Optimism
  "ARB", // Arbitrum
  "SUI", // Sui
  "PEPE", // Pepe
  "FLOKI", // Floki
  "INJ", // Injective
]).describe(`The crypto currency symbol (e.g. 'BTC', 'ETH', 'USDT', 'BNB')`);

export type CryptoSymbol = z.infer<typeof CryptoSymbolEnumZod>;

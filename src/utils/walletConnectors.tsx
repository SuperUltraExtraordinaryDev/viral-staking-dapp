import { InjectedConnector } from "@web3-react/injected-connector";

import { WalletLinkConnector } from "@web3-react/walletlink-connector";

import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
});

const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,

    appName: "Web3-react Demo",

    supportedChainIds: [1, 3, 4, 5, 42],
});

const RPC_URLS: { [chainId: number]: string } = {
    1: process.env.RPC_URL_1 as string,
    4: process.env.RPC_URL_4 as string,
};

const WalletConnect = new WalletConnectConnector({
    rpc: { 1: RPC_URLS[1] },

    bridge: "https://bridge.walletconnect.org",

    qrcode: true,
});

export { Injected, CoinbaseWallet, WalletConnect };

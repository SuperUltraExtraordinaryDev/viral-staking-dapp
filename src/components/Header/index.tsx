// node_modules
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Image, Stack } from "@chakra-ui/react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

// context
import WalletContext from "../../context/walletContext";

// config
import { providerOptions } from "../../config";

// consts
import { PATH } from "../../consts";

// assets
import Logo from "../../assets/satoshi-head.png";
import ButtonImage from "../../assets/button.png";

const HeaderComponent: React.FC = () => {
    const [provider, setProvider] = useState<any>(null);
    const [library, setLibrary] = useState<any>(null);
    const [account, setAccount] = useState<any>(null);
    const [signature, setSignature] = useState("");
    const [error, setError] = useState<any>("");
    const [chainId, setChainId] = useState<any>(null);
    const [network, setNetwork] = useState<any>(null);
    const [message, setMessage] = useState("");
    const [signedMessage, setSignedMessage] = useState("");
    const [verified, setVerified] = useState();

    const walletContext = useContext(WalletContext);

    const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions, // required
    });

    const connectWallet = async () => {
        try {
            const provider = await web3Modal.connect();
            await provider.enable();
            const library = new ethers.providers.Web3Provider(provider);
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();
            setProvider(provider);
            setLibrary(library);
            if (accounts) {
                setAccount(accounts[0]);
                walletContext.setAccount(accounts[0]);
            }
            setChainId(network.chainId);
        } catch (error) {
            setError(error);
        }
    };

    const refreshState = () => {
        setAccount(null);
        setChainId(null);
        setNetwork(null);
        setMessage("");
        setSignature("");
        setVerified(undefined);
    };

    const disconnect = async () => {
        await web3Modal.clearCachedProvider();
        refreshState();
    };

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connectWallet();
        }
    }, []);

    useEffect(() => {
        if (provider?.on) {
            const handleAccountsChanged = (accounts: any) => {
                console.log("accountsChanged", accounts);
                if (accounts) setAccount(accounts[0]);
            };

            const handleChainChanged = (_hexChainId: any) => {
                setChainId(_hexChainId);
            };

            const handleDisconnect = () => {
                console.log("disconnect", error);
                disconnect();
            };

            provider.on("accountsChanged", handleAccountsChanged);
            provider.on("chainChanged", handleChainChanged);
            provider.on("disconnect", handleDisconnect);

            return () => {
                if (provider.removeListener) {
                    provider.removeListener(
                        "accountsChanged",
                        handleAccountsChanged
                    );
                    provider.removeListener("chainChanged", handleChainChanged);
                    provider.removeListener("disconnect", handleDisconnect);
                }
            };
        }
    }, [provider]);

    return (
        <Flex
            padding={"10px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={"20px"}
        >
            <Link to={PATH.HOME}>
                <Button
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={"120px"}
                    height={"50px"}
                    overflow={"hidden"}
                    backgroundImage={ButtonImage}
                    fontSize={"14px"}
                    border={"none"}
                    backgroundRepeat={"no-repeat"}
                    backgroundSize={"cover"}
                >
                    SATOSHI BANK
                </Button>
            </Link>
            <Image src={Logo} width={"50px"} alt="logo" />
            <Button
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"120px"}
                height={"50px"}
                overflow={"hidden"}
                backgroundImage={ButtonImage}
                fontSize={"14px"}
                border={"none"}
                backgroundRepeat={"no-repeat"}
                backgroundSize={"cover"}
                onClick={() => {
                    if (!account) {
                        connectWallet();
                    } else {
                        disconnect();
                    }
                }}
            >
                {!account ? "Connect Wallet" : account}
            </Button>
        </Flex>
    );
};

export default HeaderComponent;

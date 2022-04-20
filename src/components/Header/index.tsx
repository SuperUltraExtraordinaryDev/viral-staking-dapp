// node_modules
import React, {
    useState,
    useEffect,
    useContext,
    useCallback,
    useMemo,
} from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Image } from "@chakra-ui/react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

// context
import WalletContext from "../../context/walletContext";

// config
import { providerOptions, Contracts } from "../../config";

// consts
import { PATH } from "../../consts";

// utils
import { getWeb3 } from "../../utils";

// assets
import Logo from "../../assets/satoshi-head.png";
import ButtonImage from "../../assets/button.png";

const HeaderComponent: React.FC = () => {
    const [provider, setProvider] = useState<any>(null);
    const [account, setAccount] = useState<string>("");

    const walletContext = useContext(WalletContext);

    const web3Modal = useMemo(
        () =>
            new Web3Modal({
                cacheProvider: true, // optional
                providerOptions, // required
            }),
        []
    );

    const connectWallet = useCallback(async () => {
        try {
            const provider = await web3Modal.connect();
            await provider.enable();
            const library = new ethers.providers.Web3Provider(provider);
            const accounts = await library.listAccounts();
            setProvider(provider);
            if (accounts) {
                setAccount(accounts[0]);
                walletContext.setAccount(accounts[0]);
            }

            const web3Instance = await getWeb3();
            walletContext.setWeb3Instance(web3Instance);

            const stakingContractInstance = new web3Instance.eth.Contract(
                Contracts.stakingContract.ABI,
                Contracts.stakingContract.address
            );
            walletContext.setStakingContract(stakingContractInstance);

            const satsTokenContractInstance = new web3Instance.eth.Contract(
                Contracts.satsTokenContract.ABI,
                Contracts.satsTokenContract.address
            );
            walletContext.setSATsTokenContract(satsTokenContractInstance);
        } catch (error) {
            console.error("error:", error);
        }
    }, [walletContext, web3Modal]);

    const refreshState = useCallback(() => {
        setAccount("");
        walletContext.setAccount("");
    }, [walletContext]);

    const disconnect = useCallback(async () => {
        await web3Modal.clearCachedProvider();
        refreshState();
    }, [web3Modal, refreshState]);

    // useEffect(() => {
    //     if (web3Modal.cachedProvider) {
    //         connectWallet();
    //     }
    // }, [web3Modal.cachedProvider, connectWallet]);

    useEffect(() => {
        if (provider?.on) {
            const handleAccountsChanged = (accounts: any) => {
                console.log("accountsChanged", accounts);
                if (accounts) setAccount(accounts[0]);
            };

            const handleDisconnect = () => {
                disconnect();
            };

            provider.on("accountsChanged", handleAccountsChanged);
            provider.on("disconnect", handleDisconnect);

            return () => {
                if (provider.removeListener) {
                    provider.removeListener(
                        "accountsChanged",
                        handleAccountsChanged
                    );
                    provider.removeListener("disconnect", handleDisconnect);
                }
            };
        }
    }, [provider, disconnect]);

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
                    width={"150px"}
                    height={"60px"}
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
                width={"150px"}
                height={"60px"}
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

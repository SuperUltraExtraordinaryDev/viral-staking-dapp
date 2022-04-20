// node_modules
import React, { useState } from "react";

interface WalletContextObj {
    account: string;
    web3Instance: any;
    stakingContract: any;
    satsTokenContract: any;
    loading: boolean[];
    setAccount: (account: string) => void;
    setWeb3Instance: (web3Instance: any) => void;
    setStakingContract: (stakingContract: any) => void;
    setSATsTokenContract: (satsTokenContract: any) => void;
    setLoading: () => void;
    finishLoading: () => void;
    isLoading: () => boolean;
}

const WalletContext = React.createContext<WalletContextObj>({
    account: "",
    web3Instance: null,
    stakingContract: null,
    satsTokenContract: null,
    loading: [],
    setAccount: (account: string) => {},
    setWeb3Instance: (web3Instance: any) => {},
    setStakingContract: (stakingContract: any) => {},
    setSATsTokenContract: (satsTokenContract: any) => {},
    setLoading: () => {},
    finishLoading: () => {},
    isLoading: () => true,
});

export const WalletProvider: React.FC = (props) => {
    const [account, setAccount] = useState<string>("");
    const [web3Instance, setWeb3Instance] = useState<any>(null);
    const [stakingContract, setStakingContract] = useState<any>(null);
    const [satsTokenContract, setSATsTokenContract] = useState<any>(null);
    const [loading, setLoading] = useState<boolean[]>([]);

    const walletValue: WalletContextObj = {
        account: account,
        web3Instance: web3Instance,
        stakingContract: stakingContract,
        satsTokenContract: satsTokenContract,
        loading: loading,
        setAccount: (newAccount) => {
            console.log("setAccount");
            setAccount(newAccount);
        },
        setWeb3Instance: (web3Instance) => {
            console.log("setWeb3Instance");
            setWeb3Instance(web3Instance);
        },
        setStakingContract: (stakingContract) => {
            console.log("setStakingContract");
            setStakingContract(stakingContract);
        },
        setSATsTokenContract: (satsTokenContract) => {
            console.log("setSATsTokenContract");
            setSATsTokenContract(satsTokenContract);
        },
        setLoading: () => {
            console.log("setLoading");
            setLoading([...loading, true]);
        },
        finishLoading: () => {
            console.log("finishLoading");
            setLoading([...loading].slice(1));
        },
        isLoading: (): boolean => {
            console.log("loading:", loading);
            return loading.length > 0;
        },
    };

    return (
        <WalletContext.Provider value={walletValue}>
            {props.children}
        </WalletContext.Provider>
    );
};

export default WalletContext;

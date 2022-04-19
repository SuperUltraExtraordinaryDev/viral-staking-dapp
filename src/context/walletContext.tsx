// node_modules
import React, { useState, useEffect } from "react";

interface WalletContextObj {
    account: string;
    web3Instance: any;
    stakingContract: any;
    satsTokenContract: any;
    setAccount: (account: string) => void;
    setWeb3Instance: (web3Instance: any) => void;
    setStakingContract: (stakingContract: any) => void;
    setSATsTokenContract: (satsTokenContract: any) => void;
}

const WalletContext = React.createContext<WalletContextObj>({
    account: "",
    web3Instance: null,
    stakingContract: null,
    satsTokenContract: null,
    setAccount: (account: string) => {},
    setWeb3Instance: (web3Instance: any) => {},
    setStakingContract: (stakingContract: any) => {},
    setSATsTokenContract: (satsTokenContract: any) => {},
});

export const WalletProvider: React.FC = (props) => {
    const [account, setAccount] = useState<string>("");
    const [web3Instance, setWeb3Instance] = useState<any>(null);
    const [stakingContract, setStakingContract] = useState<any>(null);
    const [satsTokenContract, setSATsTokenContract] = useState<any>(null);

    const walletValue: WalletContextObj = {
        account: account,
        web3Instance: web3Instance,
        stakingContract: stakingContract,
        satsTokenContract: satsTokenContract,
        setAccount: (newAccount) => {
            setAccount(newAccount);
        },
        setWeb3Instance: (web3Instance) => {
            setWeb3Instance(web3Instance);
        },
        setStakingContract: (stakingContract) => {
            setStakingContract(stakingContract);
        },
        setSATsTokenContract: (satsTokenContract) => {
            setSATsTokenContract(satsTokenContract);
        },
    };

    return (
        <WalletContext.Provider value={walletValue}>
            {props.children}
        </WalletContext.Provider>
    );
};

export default WalletContext;

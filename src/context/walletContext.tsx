// node_modules
import React, { useState, useEffect } from "react";

interface WalletContextObj {
    account: string;
    setAccount: (account: string) => void;
}

const WalletContext = React.createContext<WalletContextObj>({
    account: "",
    setAccount: (account: string) => {},
});

export const WalletProvider: React.FC = (props) => {
    const [account, setAccount] = useState("");

    const walletValue: WalletContextObj = {
        account: account,
        setAccount: (newAccount) => {
            setAccount(newAccount);
        },
    };

    return (
        <WalletContext.Provider value={walletValue}>
            {props.children}
        </WalletContext.Provider>
    );
};

export default WalletContext;

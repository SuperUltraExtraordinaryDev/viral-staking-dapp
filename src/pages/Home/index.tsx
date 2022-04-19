// node_modules
import React, { useState, useEffect, useContext } from "react";
import { Flex } from "@chakra-ui/react";

// components
import { ValueItemBoxComponent } from "../../components";

// context
import WalletContext from "../../context/walletContext";

const HomePage: React.FC = () => {
    const [SATsBalance, setSATsBalance] = useState<string>("0");
    const [SATsPrice, setSATsPrice] = useState<string>("0");
    const [treasuryBalance, setTreasuryBalance] = useState<string>("0");
    const [burnedTokens, setBurnedTokens] = useState<string>("0");

    const walletContext = useContext(WalletContext);

    useEffect(() => {
        if (walletContext.account && walletContext.stakingContract) {
            walletContext.stakingContract.methods
                .GetStakeTokenBalanceOf(walletContext.account)
                .call()
                .then((balance: string) => {
                    const originalValue: any =
                        walletContext.web3Instance.utils.fromWei(
                            balance,
                            "ether"
                        );
                    setSATsBalance(originalValue);
                });
        }
    }, [walletContext.account, walletContext.stakingContract]);

    return (
        <>
            <Flex
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                    "@media only screen and (max-width: 750px)": {
                        display: "grid",
                    },
                }}
            >
                <ValueItemBoxComponent
                    label={"Your Balance"}
                    text={`${SATsBalance} SATs`}
                />
                <ValueItemBoxComponent
                    label={"$SATs Price"}
                    text={`${SATsPrice}$`}
                />
            </Flex>
            <Flex
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                    "@media only screen and (max-width: 750px)": {
                        display: "grid",
                    },
                }}
            >
                <ValueItemBoxComponent
                    label={"Treasury Balance"}
                    text={`${treasuryBalance} $`}
                />
                <ValueItemBoxComponent
                    label={"Burned Tokens"}
                    text={`${burnedTokens} SATs`}
                />
            </Flex>
        </>
    );
};

export default HomePage;

// node_modules
import React, { useState, useContext, useCallback, useEffect } from "react";
import { Flex } from "@chakra-ui/react";

// components
import { ValueItemBoxComponent } from "../../components";

// context
import WalletContext from "../../context/walletContext";

const HomePage: React.FC = () => {
    const [SATsBalance, setSATsBalance] = useState<string>("0");
    const [SATsPrice] = useState<string>("0");
    const [treasuryBalance] = useState<string>("0");
    const [burnedTokens] = useState<string>("0");

    const walletContext = useContext(WalletContext);

    const getSATsBalance = useCallback(async () => {
        if (walletContext.account && walletContext.stakingContract) {
            console.log("inside getSATsBalance");
            walletContext.setLoading();
            const balance = await walletContext.stakingContract.methods
                .GetStakeTokenBalanceOf(walletContext.account)
                .call();
            walletContext.finishLoading();
            const originalValue: any = walletContext.web3Instance.utils.fromWei(
                balance,
                "ether"
            );
            setSATsBalance(originalValue);
        }
    }, [walletContext.account, walletContext.stakingContract]);

    useEffect(() => {
        console.log("getSATsBalance");
        getSATsBalance();
    }, [getSATsBalance]);

    return (
        <>
            <Flex
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                    "@media only screen and (max-width: 800px)": {
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
                    "@media only screen and (max-width: 800px)": {
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

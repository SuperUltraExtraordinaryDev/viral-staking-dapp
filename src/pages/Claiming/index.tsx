// node_modules
import React, { useState, useEffect, useContext, useCallback } from "react";
import {
    Grid,
    InputGroup,
    InputLeftAddon,
    Button,
    Flex,
    Text,
    useToast,
} from "@chakra-ui/react";

// context
import WalletContext from "../../context/walletContext";

const ClaimingPage: React.FC = () => {
    const walletContext = useContext(WalletContext);
    const toast = useToast();

    const [stakingRewardAmount, setStakingRewardAmount] = useState<string>("0");
    const [availableRewardAmount, setAvailableRewardAmount] =
        useState<string>("0");

    const getData = useCallback(async () => {
        if (
            walletContext.account &&
            walletContext.web3Instance &&
            walletContext.stakingContract
        ) {
            walletContext.setLoading();
            const wbtcAvailableRewardAmount =
                await walletContext.stakingContract.methods
                    .GetMaxUnclaimedAmount(walletContext.account)
                    .call();
            walletContext.finishLoading();

            const tempAvailableRewardAmount =
                walletContext.web3Instance.utils.fromWei(
                    wbtcAvailableRewardAmount,
                    "ether"
                );

            setAvailableRewardAmount(tempAvailableRewardAmount);

            walletContext.setLoading();
            const stakingList = await walletContext.stakingContract.methods
                .GetStakingListOf(walletContext.account)
                .call();
            walletContext.finishLoading();

            let wbtcStakingRewardAmount = 0;
            for (let i = 0; i < stakingList.length; i++) {
                if (!stakingList[i].withdrawn) {
                    wbtcStakingRewardAmount += Number(
                        walletContext.web3Instance.utils.fromWei(
                            stakingList[i].availableUnclaimedReward,
                            "ether"
                        )
                    );
                }
            }

            setStakingRewardAmount(wbtcStakingRewardAmount.toString());
        }
    }, [
        walletContext.account,
        walletContext.web3Instance,
        walletContext.stakingContract,
    ]);

    useEffect(() => {
        getData();
    }, [getData]);

    const onClaim = () => {
        if (walletContext.account) {
            const amount = walletContext.web3Instance.utils.toWei(
                availableRewardAmount,
                "ether"
            );
            console.log(amount);
            walletContext.stakingContract.methods
                .claim(amount)
                .send({ from: walletContext.account });
        } else {
            toast({
                title: `Wallet not connected`,
                status: "error",
                isClosable: true,
                duration: 3000,
            });
        }
    };

    return (
        <Grid
            backgroundColor={"rgba(100, 100, 100, 0.4);"}
            alignItems={"center"}
            margin-top={"30px"}
            width={"500px"}
            borderRadius={"10px"}
            sx={{
                "@media only screen and (max-width: 600px)": {
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",
                },
            }}
            padding={"30px"}
        >
            <InputGroup backgroundColor={"white"} color={"black"}>
                <InputLeftAddon
                    children="Claimed WBTC Rewards"
                    sx={{
                        "@media only screen and (max-width: 600px)": {
                            fontSize: "12px",
                        },
                    }}
                />
                <Text pl={"10px"} display={"flex"} alignItems={"center"}>
                    {stakingRewardAmount}
                </Text>
            </InputGroup>
            <InputGroup backgroundColor={"white"} color={"black"} mt={"20px"}>
                <InputLeftAddon
                    children="Available WBTC Rewards"
                    sx={{
                        "@media only screen and (max-width: 600px)": {
                            fontSize: "12px",
                        },
                    }}
                />
                <Text pl={"10px"} display={"flex"} alignItems={"center"}>
                    {availableRewardAmount}
                </Text>
            </InputGroup>
            <Flex alignItems={"center"} justifyContent={"center"} mt={"20px"}>
                <Button width={"200px"} onClick={onClaim}>
                    Claim WBTC
                </Button>
            </Flex>
        </Grid>
    );
};

export default ClaimingPage;

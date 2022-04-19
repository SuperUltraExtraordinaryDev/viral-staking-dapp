// node_modules
import React, { useState, useEffect, useContext } from "react";
import {
    Grid,
    InputGroup,
    Input,
    InputLeftAddon,
    Button,
    Flex,
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

    useEffect(() => {
        if (walletContext.account && walletContext.stakingContract) {
            walletContext.stakingContract.methods
                .GetMaxUnclaimedAmount(walletContext.account)
                .call()
                .then((wbtcAvailableRewardAmount: string) => {
                    const tempAvailableRewardAmount =
                        walletContext.web3Instance.utils.fromWei(
                            wbtcAvailableRewardAmount,
                            "ether"
                        );
                    setAvailableRewardAmount(tempAvailableRewardAmount);

                    walletContext.stakingContract.methods
                        .GetStakingListOf(walletContext.account)
                        .call()
                        .then((stakingList: any[]) => {
                            let wbtcStakingRewardAmount = 0;
                            for (let i = 0; i < stakingList.length; i++) {
                                if (!stakingList[i].withdrawn) {
                                    wbtcStakingRewardAmount += Number(
                                        walletContext.web3Instance.utils.fromWei(
                                            stakingList[i]
                                                .availableUnclaimedReward,
                                            "ether"
                                        )
                                    );
                                    console.log(
                                        "wbtcStakingRewardAmount:",
                                        wbtcStakingRewardAmount
                                    );
                                }
                            }
                            setStakingRewardAmount(
                                wbtcStakingRewardAmount.toString()
                            );
                        });
                });
        }
    }, [walletContext.account, walletContext.stakingContract]);

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
            backgroundColor={"rgb(126, 126, 125)"}
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
                    children="Staking Rewards Amount"
                    sx={{
                        "@media only screen and (max-width: 600px)": {
                            fontSize: "12px",
                        },
                    }}
                />
                <Input value={stakingRewardAmount} disabled />
            </InputGroup>
            <InputGroup backgroundColor={"white"} color={"black"} mt={"20px"}>
                <InputLeftAddon
                    children="Available Reward Amount"
                    sx={{
                        "@media only screen and (max-width: 600px)": {
                            fontSize: "12px",
                        },
                    }}
                />
                <Input value={availableRewardAmount} disabled />
            </InputGroup>
            <Flex alignItems={"center"} justifyContent={"center"} mt={"20px"}>
                <Button width={"200px"} onClick={onClaim}>
                    Claim
                </Button>
            </Flex>
        </Grid>
    );
};

export default ClaimingPage;

// node_modules
import React, {
    useState,
    useEffect,
    useContext,
    useRef,
    useCallback,
} from "react";
import {
    Grid,
    InputGroup,
    Input,
    InputLeftAddon,
    InputRightAddon,
    Button,
    Flex,
    Text,
    useToast,
} from "@chakra-ui/react";

// context
import WalletContext from "../../context/walletContext";

// config
import { Contracts } from "../../config";

const StakingPage: React.FC = () => {
    const walletContext = useContext(WalletContext);
    const toast = useToast();

    const [allowance, setAllowance] = useState<string>("0");
    const [totalStakedAmount, setTotalStakedAmount] = useState<string>("0");
    const [stakingPoolPercent, setStakingPoolPercent] = useState<string>("0");
    const [totalUnstakedAmount, setTotalUnstakedAmount] = useState<string>("0");

    const stakeAmountRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const unstakeAmountRef =
        useRef() as React.MutableRefObject<HTMLInputElement>;

    const getData = useCallback(async () => {
        if (walletContext.account && walletContext.stakingContract) {
            walletContext.setLoading();
            const stakingList = await walletContext.stakingContract.methods
                .GetStakingListOf(walletContext.account)
                .call();
            walletContext.finishLoading();

            let tempTotalStakedAmount = 0;
            let tempTotalUnstakedAmount = 0;
            for (let i = 0; i < stakingList.length; i++) {
                if (!stakingList[i].unstaked) {
                    tempTotalStakedAmount += Number(
                        walletContext.web3Instance.utils.fromWei(
                            stakingList[i].amount,
                            "ether"
                        )
                    );
                    tempTotalUnstakedAmount += Number(
                        walletContext.web3Instance.utils.fromWei(
                            stakingList[i].availableUnstakedAmount,
                            "ether"
                        )
                    );
                }
            }

            setStakingPoolPercent("0");
            setTotalStakedAmount(tempTotalStakedAmount.toString());
            setTotalUnstakedAmount(tempTotalUnstakedAmount.toString());
        }
        if (walletContext.account && walletContext.satsTokenContract) {
            walletContext.setLoading();
            const satsAllowance = await walletContext.satsTokenContract.methods
                .allowance(
                    walletContext.account,
                    Contracts.stakingContract.address
                )
                .call();
            walletContext.finishLoading();

            setAllowance(satsAllowance);
        }
    }, [
        walletContext.account,
        walletContext.stakingContract,
        walletContext.satsTokenContract,
        walletContext.web3Instance,
    ]);

    useEffect(() => {
        getData();
    }, [getData]);

    const onStake = async () => {
        if (walletContext.account) {
            if (stakeAmountRef.current.value) {
                const amount = walletContext.web3Instance.utils.toWei(
                    stakeAmountRef.current.value,
                    "ether"
                );
                walletContext.setLoading();
                await walletContext.stakingContract.methods
                    .stake(amount)
                    .send({ from: walletContext.account });
                walletContext.finishLoading();
            } else {
                toast({
                    title: `Please insert correct amount!`,
                    status: "error",
                    isClosable: true,
                    duration: 3000,
                });
            }
        } else {
            toast({
                title: `Wallet not connected!`,
                status: "error",
                isClosable: true,
                duration: 3000,
            });
        }
    };

    const onUnstake = async () => {
        if (walletContext.account) {
            if (unstakeAmountRef.current.value) {
                const amount = walletContext.web3Instance.utils.toWei(
                    unstakeAmountRef.current.value,
                    "ether"
                );
                walletContext.setLoading();
                await walletContext.stakingContract.methods
                    .unstake(amount)
                    .send({ from: walletContext.account });
                walletContext.finishLoading();
            } else {
                toast({
                    title: `Please insert correct amount!`,
                    status: "error",
                    isClosable: true,
                    duration: 3000,
                });
            }
        } else {
            toast({
                title: `Wallet not connected`,
                status: "error",
                isClosable: true,
                duration: 3000,
            });
        }
    };

    const onApprove = async () => {
        if (walletContext.account && walletContext.satsTokenContract) {
            if (stakeAmountRef.current.value) {
                walletContext.setLoading();
                await walletContext.satsTokenContract.methods
                    .approve(
                        Contracts.stakingContract.address,
                        stakeAmountRef.current.value
                    )
                    .send({ from: walletContext.account });
                walletContext.finishLoading();
            } else {
                toast({
                    title: `Please insert correct amount!`,
                    status: "error",
                    isClosable: true,
                    duration: 3000,
                });
            }
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
                    children="Total Staked Amount"
                    sx={{
                        "@media only screen and (max-width: 600px)": {
                            fontSize: "12px",
                        },
                    }}
                />
                <Text pl={"10px"} display={"flex"} alignItems={"center"}>
                    {totalStakedAmount}
                </Text>
            </InputGroup>
            <InputGroup backgroundColor={"white"} color={"black"} mt={"20px"}>
                <InputLeftAddon
                    children="% Staking Pool"
                    sx={{
                        "@media only screen and (max-width: 600px)": {
                            fontSize: "12px",
                        },
                    }}
                />
                <Text pl={"10px"} display={"flex"} alignItems={"center"}>
                    {stakingPoolPercent}
                </Text>
            </InputGroup>
            <InputGroup backgroundColor={"white"} color={"black"} mt={"20px"}>
                <Input
                    placeholder="Staking Amount of SATs Token"
                    borderRadius={"none"}
                    borderBottom={"3px solid black"}
                    ref={stakeAmountRef}
                />
                <InputRightAddon
                    onClick={() => {
                        stakeAmountRef.current.value = totalStakedAmount;
                    }}
                    cursor={"pointer"}
                    children="MAX"
                />
            </InputGroup>
            <Flex alignItems={"center"} justifyContent={"center"} mt={"20px"}>
                <Button width={"200px"} onClick={onApprove}>
                    Approve
                </Button>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"center"} mt={"20px"}>
                <Button
                    width={"200px"}
                    onClick={onStake}
                    disabled={allowance === "0"}
                >
                    Stake
                </Button>
            </Flex>

            <InputGroup backgroundColor={"white"} color={"black"} mt={"40px"}>
                <InputLeftAddon
                    children="Total Untaked Amount"
                    sx={{
                        "@media only screen and (max-width: 600px)": {
                            fontSize: "12px",
                        },
                    }}
                />
                <Text pl={"10px"} display={"flex"} alignItems={"center"}>
                    {totalUnstakedAmount}
                </Text>
            </InputGroup>
            <InputGroup backgroundColor={"white"} color={"black"} mt={"20px"}>
                <Input
                    placeholder="Unstaking Amount of SATs Token"
                    borderRadius={"none"}
                    borderBottom={"3px solid black"}
                    ref={unstakeAmountRef}
                />
                <InputRightAddon
                    onClick={() => {
                        unstakeAmountRef.current.value = totalUnstakedAmount;
                    }}
                    cursor={"pointer"}
                    children="MAX"
                />
            </InputGroup>
            <Flex alignItems={"center"} justifyContent={"center"} mt={"20px"}>
                <Button width={"200px"} onClick={onUnstake}>
                    Unstake
                </Button>
            </Flex>
        </Grid>
    );
};

export default StakingPage;

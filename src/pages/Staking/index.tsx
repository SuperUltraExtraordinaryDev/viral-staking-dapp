// node_modules
import React from "react";
import {
    Grid,
    InputGroup,
    Input,
    InputLeftAddon,
    InputRightAddon,
    Button,
    Flex,
} from "@chakra-ui/react";

const StakingPage: React.FC = () => {
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
                <InputLeftAddon children="Total Staked Amount" />
                <Input value={"0"} disabled />
            </InputGroup>
            <InputGroup backgroundColor={"white"} color={"black"} mt={"20px"}>
                <InputLeftAddon children="% Staking Pool" />
                <Input value={"0"} disabled />
            </InputGroup>
            <InputGroup backgroundColor={"white"} color={"black"} mt={"20px"}>
                <Input
                    placeholder="Staking Amount of SATs Token"
                    borderRadius={"none"}
                    borderBottom={"3px solid black"}
                />
                <InputRightAddon children="MAX" />
            </InputGroup>
            <Flex alignItems={"center"} justifyContent={"center"} mt={"20px"}>
                <Button width={"200px"}>Approve</Button>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"center"} mt={"20px"}>
                <Button width={"200px"}>Stake</Button>
            </Flex>

            <InputGroup backgroundColor={"white"} color={"black"} mt={"40px"}>
                <InputLeftAddon children="Total Untaked Amount" />
                <Input value={"0"} disabled />
            </InputGroup>
            <InputGroup backgroundColor={"white"} color={"black"} mt={"20px"}>
                <Input
                    placeholder="Unstaking Amount of SATs Token"
                    borderRadius={"none"}
                    borderBottom={"3px solid black"}
                />
                <InputRightAddon children="MAX" />
            </InputGroup>
            <Flex alignItems={"center"} justifyContent={"center"} mt={"20px"}>
                <Button width={"200px"}>Unstake</Button>
            </Flex>
        </Grid>
    );
};

export default StakingPage;

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

const ClaimingPage: React.FC = () => {
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
                <InputLeftAddon children="Staking Rewards Amount" />
                <Input value={"0"} disabled />
            </InputGroup>
            <InputGroup backgroundColor={"white"} color={"black"} mt={"20px"}>
                <InputLeftAddon children="Available Reward Amount" />
                <Input value={"0"} disabled />
            </InputGroup>
            <Flex alignItems={"center"} justifyContent={"center"} mt={"20px"}>
                <Button width={"200px"}>Claim</Button>
            </Flex>
        </Grid>
    );
};

export default ClaimingPage;

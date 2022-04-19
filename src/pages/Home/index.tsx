// node_modules
import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";

// components
import { ValueItemBoxComponent } from "../../components";

const HomePage: React.FC = () => {
    const [SATsBalance, setSATsBalance] = useState<string>("0");
    const [SATsPrice, setSATsPrice] = useState<string>("0");
    const [treasuryBalance, setTreasuryBalance] = useState<string>("0");
    const [burnedTokens, setBurnedTokens] = useState<string>("0");

    return (
        <>
            <Flex
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                    "@media only screen and (max-width: 600px)": {
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
                    "@media only screen and (max-width: 600px)": {
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

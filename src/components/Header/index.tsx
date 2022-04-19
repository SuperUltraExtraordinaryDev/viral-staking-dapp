// node_modules
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Image, Stack } from "@chakra-ui/react";
import { useWeb3Context } from "web3-react";

// consts
import { PATH } from "../../consts";

// assets
import Logo from "../../assets/satoshi-head.png";
import ButtonImage from "../../assets/button.png";

const HeaderComponent: React.FC = () => {
    const context = useWeb3Context();

    useEffect(() => {
        context.setFirstValidConnector(["MetaMask", "Infura"]);
    }, [context]);

    return (
        <Flex
            padding={"10px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={"20px"}
        >
            <Link to={PATH.HOME}>
                <Button
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    width={"120px"}
                    height={"50px"}
                    overflow={"hidden"}
                    backgroundImage={ButtonImage}
                    fontSize={"14px"}
                    border={"none"}
                    backgroundRepeat={"no-repeat"}
                    backgroundSize={"cover"}
                >
                    SATOSHI BANK
                </Button>
            </Link>
            <Image src={Logo} width={"50px"} alt="logo" />
            <Button
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"120px"}
                height={"50px"}
                overflow={"hidden"}
                backgroundImage={ButtonImage}
                fontSize={"14px"}
                border={"none"}
                backgroundRepeat={"no-repeat"}
                backgroundSize={"cover"}
            >
                CONNECT
            </Button>
        </Flex>
    );
};

export default HeaderComponent;

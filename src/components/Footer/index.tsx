// node_modules
import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";

// consts
import { PATH } from "../../consts";

const FooterComponent: React.FC = () => {
    return (
        <Flex
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"relative"}
            mt={"20px"}
            mb={"20px"}
        >
            <Link to={PATH.HOME}>
                <Button
                    backgroundColor={"white"}
                    borderRadius={"15px"}
                    width={"100px"}
                    height={"40px"}
                    position={"relative"}
                >
                    BACK
                </Button>
            </Link>
        </Flex>
    );
};

export default FooterComponent;

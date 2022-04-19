// node_modules
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";

// consts
import { PATH } from "../../consts";

const ControllerComponent: React.FC = () => {
    const location = useLocation();

    return (
        <Flex
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"relative"}
            mb={"10px"}
        >
            <Link to={PATH.STAKING}>
                <Button
                    backgroundColor={
                        location.pathname === PATH.STAKING
                            ? "lightgray"
                            : "white"
                    }
                    borderRadius={"none"}
                    width={"150px"}
                    height={"40px"}
                    position={"relative"}
                    borderTopLeftRadius={"15px"}
                    borderBottomLeftRadius={"15px"}
                >
                    Staking
                </Button>
            </Link>
            <Link to={PATH.CLAIMING}>
                <Button
                    backgroundColor={
                        location.pathname === PATH.CLAIMING
                            ? "lightgray"
                            : "white"
                    }
                    borderRadius={"none"}
                    width={"150px"}
                    height={"40px"}
                    position={"relative"}
                    borderTopRightRadius={"15px"}
                    borderBottomRightRadius={"15px"}
                >
                    Claiming
                </Button>
            </Link>
        </Flex>
    );
};

export default ControllerComponent;

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
                    borderRadius={"15px"}
                    width={"150px"}
                    height={"40px"}
                    marginRight={"-15px"}
                    zIndex={location.pathname === PATH.STAKING ? 5 : 3}
                    position={"relative"}
                    borderTopRightRadius={
                        location.pathname === PATH.STAKING ||
                        location.pathname === PATH.HOME
                            ? "0px"
                            : "15px"
                    }
                    borderBottomRightRadius={
                        location.pathname === PATH.STAKING ||
                        location.pathname === PATH.HOME
                            ? "0px"
                            : "15px"
                    }
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
                    borderRadius={"15px"}
                    width={"150px"}
                    height={"40px"}
                    zIndex={location.pathname === PATH.CLAIMING ? 5 : 3}
                    position={"relative"}
                    borderTopLeftRadius={
                        location.pathname === PATH.CLAIMING ? "0px" : "15px"
                    }
                    borderBottomLeftRadius={
                        location.pathname === PATH.CLAIMING ? "0px" : "15px"
                    }
                >
                    Claiming
                </Button>
            </Link>
        </Flex>
    );
};

export default ControllerComponent;

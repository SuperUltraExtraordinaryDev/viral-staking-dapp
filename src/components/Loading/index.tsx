// node_modules
import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

const LoadingComponent: React.FC = () => {
    return (
        <Box
            position={"fixed"}
            left={"0px"}
            right={"0px"}
            top={"0px"}
            bottom={"0px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            background={"rgba(180, 180, 180, 0.8)"}
            zIndex={"100"}
        >
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
        </Box>
    );
};

export default LoadingComponent;

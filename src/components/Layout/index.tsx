// node_modules
import React from "react";
import { Flex, Grid } from "@chakra-ui/react";

// components
import HeaderComponent from "../Header";
import ControllerComponent from "../Controller";
import FooterComponent from "../Footer";

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <ControllerComponent></ControllerComponent>
            <Grid alignItems={"center"} w="100%" h={"100%"}>
                {children}
            </Grid>
            <FooterComponent></FooterComponent>
        </>
    );
};

export default LayoutComponent;

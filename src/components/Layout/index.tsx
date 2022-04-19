// node_modules
import React from "react";
import { useLocation } from "react-router-dom";
import { Grid } from "@chakra-ui/react";

// components
import HeaderComponent from "../Header";
import ControllerComponent from "../Controller";
import FooterComponent from "../Footer";

// consts
import { PATH } from "../../consts";

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    return (
        <>
            <HeaderComponent></HeaderComponent>
            <ControllerComponent></ControllerComponent>
            <Grid alignItems={"center"} w="100%" h={"100%"}>
                {children}
            </Grid>
            {location.pathname !== PATH.HOME && (
                <FooterComponent></FooterComponent>
            )}
        </>
    );
};

export default LayoutComponent;

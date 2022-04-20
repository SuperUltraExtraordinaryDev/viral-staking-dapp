// node_modules
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Grid } from "@chakra-ui/react";

// components
import HeaderComponent from "../Header";
import ControllerComponent from "../Controller";
import FooterComponent from "../Footer";
import LoadingComponent from "../Loading";

// context
import WalletContext from "../../context/walletContext";

// consts
import { PATH } from "../../consts";

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const walletContext = useContext(WalletContext);

    return (
        <>
            {walletContext.isLoading() && <LoadingComponent />}
            <HeaderComponent></HeaderComponent>
            <ControllerComponent></ControllerComponent>
            <Grid
                alignItems={"center"}
                justifyContent={"center"}
                w="100%"
                h={"100%"}
            >
                {children}
            </Grid>
            {location.pathname !== PATH.HOME && (
                <FooterComponent></FooterComponent>
            )}
        </>
    );
};

export default LayoutComponent;

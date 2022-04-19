// node_modules
import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";

// pages
import { HomePage, StakingPage, ClaimingPage } from "./pages";

// components
import LayoutComponent from "./components/Layout";

// utils
import { getLibrary } from "./utils/getLibrary";

// consts
import { PATH } from "./consts";

// styles
import "./styles/global.css";

const App: React.FC = () => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <BrowserRouter>
                <LayoutComponent>
                    <Switch>
                        <Route path={PATH.HOME} exact>
                            <HomePage />
                        </Route>
                        <Route path={PATH.STAKING}>
                            <StakingPage />
                        </Route>
                        <Route path={PATH.CLAIMING}>
                            <ClaimingPage />
                        </Route>
                    </Switch>
                </LayoutComponent>
            </BrowserRouter>
        </Web3ReactProvider>
    );
};

export default App;

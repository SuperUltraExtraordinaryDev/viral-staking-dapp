// node_modules
import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Web3Provider from "web3-react";

// pages
import { HomePage, StakingPage, ClaimingPage } from "./pages";

// components
import LayoutComponent from "./components/Layout";

// utils
import connectors from "./utils/connectors";

// consts
import { PATH } from "./consts";

// styles
import "./styles/global.css";

const App: React.FC = () => {
    return (
        <Web3Provider connectors={connectors}>
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
        </Web3Provider>
    );
};

export default App;

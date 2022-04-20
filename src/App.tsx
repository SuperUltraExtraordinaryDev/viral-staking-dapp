// node_modules
import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

// pages
import { HomePage, StakingPage, ClaimingPage } from "./pages";

// components
import { LayoutComponent } from "./components";

// context
import { WalletProvider } from "./context/walletContext";

// consts
import { PATH } from "./consts";

// styles
import "./styles/global.css";

const App: React.FC = () => {
    return (
        <WalletProvider>
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
        </WalletProvider>
    );
};

export default App;

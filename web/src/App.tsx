import React, { useState, useEffect } from "react";

import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import NotificationBar from "@components/NotificationBar";
import {
    FirstFactorRoute,
    ResetPasswordStep2Route,
    ResetPasswordStep1Route,
    RegisterSecurityKeyRoute,
    RegisterOneTimePasswordRoute,
    LogoutRoute,
    ConsentRoute,
} from "@constants/Routes";
import NotificationsContext from "@hooks/NotificationsContext";
import { Notification } from "@models/Notifications";
import * as themes from "@themes/index";
import { getBasePath } from "@utils/BasePath";
import { getRememberMe, getResetPassword, getTheme } from "@utils/Configuration";
import RegisterOneTimePassword from "@views/DeviceRegistration/RegisterOneTimePassword";
import RegisterSecurityKey from "@views/DeviceRegistration/RegisterSecurityKey";
import ConsentView from "@views/LoginPortal/ConsentView/ConsentView";
import LoginPortal from "@views/LoginPortal/LoginPortal";
import SignOut from "@views/LoginPortal/SignOut/SignOut";
import ResetPasswordStep1 from "@views/ResetPassword/ResetPasswordStep1";
import ResetPasswordStep2 from "@views/ResetPassword/ResetPasswordStep2";

import "@fortawesome/fontawesome-svg-core/styles.css";

faConfig.autoAddCss = false;

function Theme() {
    switch (getTheme()) {
        case "dark":
            return themes.Dark;
        case "grey":
            return themes.Grey;
        case "socib":
            return themes.Socib;
        case "auto":
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? themes.Dark : themes.Light;
        default:
            return themes.Light;
    }
}

const App: React.FC = () => {
    const [notification, setNotification] = useState(null as Notification | null);
    const [theme, setTheme] = useState(Theme());
    useEffect(() => {
        if (getTheme() === "auto") {
            const query = window.matchMedia("(prefers-color-scheme: dark)");
            // MediaQueryLists does not inherit from EventTarget in Internet Explorer
            if (query.addEventListener) {
                query.addEventListener("change", (e) => {
                    setTheme(e.matches ? themes.Dark : themes.Light);
                });
            }
        }
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NotificationsContext.Provider value={{ notification, setNotification }}>
                <Router basename={getBasePath()}>
                    <NotificationBar onClose={() => setNotification(null)} />
                    <Switch>
                        <Route path={ResetPasswordStep1Route} exact>
                            <ResetPasswordStep1 />
                        </Route>
                        <Route path={ResetPasswordStep2Route} exact>
                            <ResetPasswordStep2 />
                        </Route>
                        <Route path={RegisterSecurityKeyRoute} exact>
                            <RegisterSecurityKey />
                        </Route>
                        <Route path={RegisterOneTimePasswordRoute} exact>
                            <RegisterOneTimePassword />
                        </Route>
                        <Route path={LogoutRoute} exact>
                            <SignOut />
                        </Route>
                        <Route path={ConsentRoute} exact>
                            <ConsentView />
                        </Route>
                        <Route path={FirstFactorRoute}>
                            <LoginPortal rememberMe={getRememberMe()} resetPassword={getResetPassword()} />
                        </Route>
                        <Route path="/">
                            <Redirect to={FirstFactorRoute} />
                        </Route>
                    </Switch>
                </Router>
            </NotificationsContext.Provider>
        </ThemeProvider>
    );
};

export default App;

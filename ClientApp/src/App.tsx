import {
    setAxiosDefaultToken,
    configureAxiosInterceptors,
} from "./config/axios.config";
import React from "react";
import Sidenav from "./components/Sidenav";
import Authenticator from "./components/Authenticator";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: "#757ce8",
            main: "#3f50b5",
            dark: "#002884",
            contrastText: "#fff",
        },
        text: {
            primary: "#fff",
            secondary: "rgba(255, 255, 255, 0.7)",
            disabled: "rgba(255, 255, 255, 0.5)",
            hint: "rgba(255, 255, 255, 0.5)",
        },
        secondary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#000",
        },
    },
});
configureAxiosInterceptors();
setAxiosDefaultToken();

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Authenticator>
                <Sidenav />
            </Authenticator>
        </ThemeProvider>
    );
};

export default App;

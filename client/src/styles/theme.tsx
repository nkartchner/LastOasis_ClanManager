import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";

const themes = [
    {
        id: "blue",
        color: blue[500],
    },
    {
        id: "red",
        color: red[500],
        source: {
            palette: {
                primary: red,
                secondary: pink,
                error: red,
            },
        },
    },
    {
        id: "default",
        source: createMuiTheme({
            palette: {
                type: "dark",
                primary: {
                    light: "#757ce8",
                    main: "#3f50b5",
                    dark: "#002884",
                    contrastText: "#fff",
                },
                secondary: {
                    light: "#ff7961",
                    main: "#f44336",
                    dark: "#ba000d",
                    contrastText: "#000",
                },
            },
        }),
    },
    {
        id: "green",
        color: green[500],
        source: {
            palette: {
                primary: green,
                secondary: red,
                error: red,
            },
        },
    },
];

export default themes;

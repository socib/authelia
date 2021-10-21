import { createTheme } from "@material-ui/core/styles";

const Socib = createTheme({
    custom: {
        icon: "#00335c",
        loadingBar: "#00335c",
    },
    palette: {
        primary: {
            main: "#00335c",
        },
        background: {
            default: "#fff",
            paper: "#fff",
        },
    },
    overrides: {
        MuiCssBaseline: {
            "@global": {
                body: {
                    backgroundColor: "#2dc6d6",
                    background: "radial-gradient(circle, #2dc6d6 20%, #00335c 100%)",
                },
                ".jss11": {
                    backgroundColor: "#ffffff",
                },
                "#logo-socib": {
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                },
            },
        },
        MuiInputBase: {
            root: {
                backgroundColor: "#ffffff",
            },
        },
        MuiOutlinedInput: {
            root: {
                "&:hover": {
                    backgroundColor: "#ffffff",
                },
            },
        },
        MuiContainer: {
            root: {
                backgroundColor: "#ffffffa1",
                borderRadius: "5px",
            },
        },
        MuiTypography: {
            h5: {
                margin: "20px 0 0 0",
            },
        },
    },
});

export default Socib;

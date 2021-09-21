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
});

export default Socib;

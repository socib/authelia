import React, { ReactNode } from "react";

import { Grid, makeStyles, Container, Typography, Link } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export interface Props {
    id?: string;
    children?: ReactNode;
    title?: string;
    showBrand?: boolean;
}

const LoginLayout = function (props: Props) {
    const style = useStyles();
    return (
        <Grid id={props.id} className={style.root} container spacing={0} alignItems="center" justify="center">
            <Container maxWidth="xs" className={style.rootContainer}>
                <Grid container>
                    {props.title ? (
                        <Grid item xs={12}>
                            <Typography variant="h5" className={style.title}>
                                {props.title}
                            </Typography>
                        </Grid>
                    ) : null}
                    <Grid item xs={12} className={style.body}>
                        {props.children}
                    </Grid>
                    {props.showBrand ? (
                        <Grid item xs={12}>
                            <Link
                                href="https://github.com/authelia/authelia"
                                target="_blank"
                                className={style.poweredBy}
                            >
                                Powered by Authelia
                            </Link>
                        </Grid>
                    ) : null}
                </Grid>
            </Container>
        </Grid>
    );
};

export default LoginLayout;

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "90vh",
        textAlign: "center",
    },
    rootContainer: {
        paddingLeft: 32,
        paddingRight: 32,
    },
    title: {},
    icon: {
        margin: theme.spacing(),
        width: "64px",
        fill: theme.custom.icon,
    },
    body: {
        marginTop: theme.spacing(),
        paddingTop: theme.spacing(),
        paddingBottom: theme.spacing(),
    },
    poweredBy: {
        fontSize: "0.7em",
        color: grey[500],
    },
}));

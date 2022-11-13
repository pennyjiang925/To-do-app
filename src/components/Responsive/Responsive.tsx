import { styled } from "@mui/material/styles"

export const Responsive = styled("div")(({ theme }) => ({
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
        width: 500,
        height: 300,
    },
    [theme.breakpoints.down("md")]: {
        width: 280,
        height: 250,
    },
}))

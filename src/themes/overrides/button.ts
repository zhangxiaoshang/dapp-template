// ** MUI Imports
import { Theme } from "@mui/material/styles";

const Button = (theme: Theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {},
        containedPrimary: {
          backgroundColor: "yellowgreen",

          "&.Mui-disabled": {
            backgroundColor: "grey",
            color: theme.palette.secondary.main, // demo: use theme
          },
        },
      },
    },
  };
};

export default Button;

import { createMuiTheme } from "@material-ui/core/styles";
// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: { main: "#16A196" },
    secondary: { main: "#333" },
    error: { main: "#fe5196" },
    background: { default: "#f2f2f2" },
    buttonMain: {
      dark: "rgba(105, 255, 135, .3)",
      main: "linear-gradient(45deg, #16A196 30%, #32A2D3 90%)",
    },
    buttonCancel: {
      dark: "rgba(255, 105, 135, .3)",
      main: "linear-gradient(45deg, #fe5196 30%, #f77062 90%)",
    }
  }
});

export default theme;

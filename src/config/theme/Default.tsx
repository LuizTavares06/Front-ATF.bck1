import { blue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue[700] ,
      dark: blue[800] ,
      light: blue[500] ,
      contrastText: '#292929',
  },

  secondary:{
      main: red[500] ,
      dark: red[400] ,
      light: red[300] ,
      contrastText: '#cccccc',
  },
  },
});

export default defaultTheme;

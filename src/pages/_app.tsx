import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

import "../styles/index.scss";
import { wrapper } from "../state/store";
// import { ThemeProvider } from "../theme/theme.config";

const MyApp = ({ Component, pageProps }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Component {...pageProps} />
    {/* <ThemeProvider>
    </ThemeProvider> */}
  </LocalizationProvider>
);

export default wrapper.withRedux(MyApp);

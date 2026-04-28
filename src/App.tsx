import { CssBaseline, ThemeProvider } from "@mui/material"
import theme from "./theme/Theme"
import { Toaster } from 'sonner'
import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster position="top-right" richColors closeButton />
        <RouterProvider router={Routes} />
      </ThemeProvider>
    </>
  );
}

export default App
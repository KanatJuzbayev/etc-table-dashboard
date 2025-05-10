import { tableTheme } from "@/widgets/Table/theme/tableTheme.ts";
import { ThemeProvider } from "@mui/material/styles";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <ThemeProvider theme={tableTheme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;

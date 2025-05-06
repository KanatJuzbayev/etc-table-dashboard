import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

// Custom MUI theme to match Tailwind styling
export const tableTheme = createTheme({
  palette: {
    primary: {
      main: "#3b82f6", // Tailwind blue-500
      light: "#93c5fd", // blue-300
      dark: "#1d4ed8", // blue-700
    },
    secondary: {
      main: "#6366f1", // Tailwind indigo-500
    },
    background: {
      default: "#ffffff",
    },
    info: {
      main: "#0ea5e9", // sky-500
    },
    success: {
      main: "#10b981", // emerald-500
    },
    warning: {
      main: "#f59e0b", // amber-500
    },
    error: {
      main: "#ef4444", // red-500
    },
    grey: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", sans-serif',
    fontSize: 13,
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          borderRadius: "0.375rem",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f9fafb", // Tailwind gray-50
          "& .MuiTableCell-head": {
            fontWeight: 600,
            color: "#374151", // Tailwind gray-700
            borderBottom: "2px solid #e5e7eb",
            whiteSpace: "nowrap",
            padding: "8px 16px",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(even)": {
            backgroundColor: alpha("#f3f4f6", 0.3), // Light gray for zebra striping
          },
          "&:hover": {
            backgroundColor: alpha("#bfdbfe", 0.3), // Light blue hover
          },
          "&.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: alpha("#93c5fd", 0.2), // Lighter blue for selected rows
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #e5e7eb", // Tailwind gray-200
          fontSize: "0.875rem",
          padding: "6px 16px",
          "&.MuiTableCell-body": {
            color: "#374151", // Tailwind gray-700
          },
        },
        head: {
          fontWeight: 600,
          color: "#374151", // Tailwind gray-700
          backgroundColor: "#f9fafb", // Tailwind gray-50
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          },
        },
        sizeSmall: {
          padding: "4px 10px",
          fontSize: "0.75rem",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 8,
          "&:hover": {
            backgroundColor: alpha("#3b82f6", 0.08),
          },
        },
        sizeSmall: {
          padding: 4,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: "#4b5563", // Tailwind gray-600
          fontSize: "0.875rem",
        },
        selectLabel: {
          fontSize: "0.875rem",
        },
        displayedRows: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#1f2937",
          fontSize: "0.75rem",
          padding: "6px 10px",
          borderRadius: "4px",
        },
      },
    },
  },
});

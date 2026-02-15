import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007AFF',
      light: '#4DA3FF',
      dark: '#0056CC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#5856D6',
      light: '#7A79E0',
      dark: '#3E3D95',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF3B30',
    },
    warning: {
      main: '#FF9500',
    },
    success: {
      main: '#34C759',
    },
    background: {
      default: '#F2F2F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C1C1E',
      secondary: '#8E8E93',
      disabled: '#C7C7CC',
    },
    divider: 'rgba(60, 60, 67, 0.08)',
    grey: {
      50: '#F9F9F9',
      100: '#F2F2F7',
      200: '#E5E5EA',
      300: '#D1D1D6',
      400: '#C7C7CC',
      500: '#AEAEB2',
      600: '#8E8E93',
      700: '#636366',
      800: '#48484A',
      900: '#1C1C1E',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      color: '#8E8E93',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      color: '#8E8E93',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    overline: {
      fontSize: '0.6875rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#8E8E93',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.04)',
    '0 2px 8px rgba(0,0,0,0.06)',
    '0 4px 16px rgba(0,0,0,0.08)',
    '0 8px 32px rgba(0,0,0,0.10)',
    ...Array(20).fill('0 8px 32px rgba(0,0,0,0.10)'),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': { boxSizing: 'border-box' },
        'html, body, #root': {
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        },
        body: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '::-webkit-scrollbar': { width: '4px' },
        '::-webkit-scrollbar-track': { background: 'transparent' },
        '::-webkit-scrollbar-thumb': {
          background: '#C7C7CC',
          borderRadius: '9999px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid rgba(60, 60, 67, 0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '0.875rem',
          fontWeight: 600,
        },
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 2px 8px rgba(0,122,255,0.3)' },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: '0.75rem',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 64,
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(60, 60, 67, 0.05)',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          padding: '6px 0',
          '&.Mui-selected': {
            color: '#007AFF',
          },
        },
        label: {
          fontSize: '0.625rem',
          '&.Mui-selected': {
            fontSize: '0.625rem',
            fontWeight: 600,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 6,
          backgroundColor: 'rgba(0,0,0,0.04)',
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
        },
      },
    },
  },
});

export default theme;

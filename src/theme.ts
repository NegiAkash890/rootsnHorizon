'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#95C11F', // Brand green-lime
      light: '#AED581',
      dark: '#739618',
      contrastText: '#FFFFFF', // White text on solid green CTA
    },
    secondary: {
      main: '#000000', // Brand deep black
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F4F4F4',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: "'akzidenz-grotesk', Helvetica, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '0.875rem 1.75rem',
          fontSize: '1rem',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          backgroundColor: '#95C11F',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#739618',
            color: '#FFFFFF',
          },
        },
        outlinedPrimary: {
          borderColor: '#95C11F',
          color: '#95C11F',
          backgroundColor: 'transparent',
          '&:hover': {
            borderColor: '#739618',
            color: '#739618',
            backgroundColor: 'rgba(149, 193, 31, 0.08)',
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: '50px', // Round FAB
        },
      },
    },
  },
});

export default theme;

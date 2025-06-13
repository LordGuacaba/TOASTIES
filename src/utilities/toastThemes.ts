'use client'
import { createTheme } from "@mui/material/styles";


export const toastTheme = createTheme({
    palette: {
      primary: {
        main: '#171717',
        light: '#2d2d2d',
        dark: '#000000',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#f56702',
        light: '#ed8237',
        dark: '#b54c02',
        contrastText: '#ffffff'
      },
      // @ts-expect-error stupid
      toast: {
        main: '#E3D026',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
      }
    }
  })
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import ApiProvider from "./context/ApiProvider";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const theme = createTheme({
    typography: {
        // Set the default font family and line height
        body1: {
            lineHeight: '1.15',
        },
        button: {
            textTransform: 'none',
        },
        h4: {
            fontSize: '1.6rem',
            color: '#B81658',
            fontWeight: 900,
        },
    },
    palette: {
        background: {
            default: '#eae8dd',
        },
    },
});

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <ApiProvider>
                <SnackbarProvider maxSnack={3}>
                    <App />
                </SnackbarProvider>
            </ApiProvider>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

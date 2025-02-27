import React from "react";
import ReactDOM from 'react-dom/client';
import Page from './layouts/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "./components/theme-provider";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const RootComponent = () => (
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <Page />
                {/* <ReactQueryDevtools initialIsOpen={false} containerElement="div" /> */}
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);
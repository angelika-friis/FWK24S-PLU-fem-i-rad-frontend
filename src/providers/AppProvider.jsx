import React from 'react';

import { ConfigProvider } from './ConfigProvider';
import { AuthProvider } from './AuthProvider';
import ApiProvider from './ApiProvider';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider } from './StylesProvider';

const AppProvider = ({ children }) => (
    <ConfigProvider>
        <AuthProvider>
            <BrowserRouter>
                <ApiProvider>
                    <StylesProvider>
                        {children}
                    </StylesProvider>
                </ApiProvider>
            </BrowserRouter>
        </AuthProvider>
    </ConfigProvider>
);
export default AppProvider;




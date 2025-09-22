import React from 'react';

import { ConfigProvider } from './ConfigProvider';
import { AuthProvider } from './AuthProvider';
import ApiProvider from './ApiProvider';
import { BrowserRouter } from 'react-router-dom';

const AppProvider = ({ children }) => (
    <ConfigProvider>
        <AuthProvider>
            <BrowserRouter>
                <ApiProvider>{children}</ApiProvider>
            </BrowserRouter>
        </AuthProvider>
    </ConfigProvider>
);
export default AppProvider;




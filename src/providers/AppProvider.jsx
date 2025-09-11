import React from 'react';

import { ConfigProvider } from './ConfigProvider';
import { AuthProvider } from './AuthProvider';
import { ApiProvider } from './ApiProvider';

const AppProvider = ({ children }) => (
    <ConfigProvider>
        <AuthProvider>
            <ApiProvider>{children}</ApiProvider>
        </AuthProvider>
    </ConfigProvider>
);
export default AppProvider;




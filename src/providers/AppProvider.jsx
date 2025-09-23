import React from 'react';

import { ConfigProvider } from './ConfigProvider';
import AuthProvider from './AuthProvider';
import ApiProvider from './ApiProvider';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider } from '../foundation/StylesProvider';
import BoardProvider from './BoardProvider';

const AppProvider = ({ children }) => (
    <ConfigProvider>
        <AuthProvider>
            <BrowserRouter>
                <ApiProvider>
                    <BoardProvider>
                        <StylesProvider>
                            {children}
                        </StylesProvider>
                    </BoardProvider>
                </ApiProvider>
            </BrowserRouter>
        </AuthProvider>
    </ConfigProvider>
);
export default AppProvider;




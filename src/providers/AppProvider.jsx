import React from 'react';

import { ConfigProvider } from './ConfigProvider';
import AuthProvider from './AuthProvider';
import ApiProvider from './ApiProvider';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider } from '../foundation/StylesProvider';
import BoardProvider from './BoardProvider';
import ConnectionProvider from './ConnectionProvider';

const AppProvider = ({ children }) => {
    return (
        <ConfigProvider>
            <AuthProvider>
                <BrowserRouter>
                    <ApiProvider>
                        <BoardProvider>
                            <ConnectionProvider>
                                <StylesProvider>
                                    {children}
                                </StylesProvider>
                            </ConnectionProvider>
                        </BoardProvider>
                    </ApiProvider>
                </BrowserRouter>
            </AuthProvider>
        </ConfigProvider>
    );
}

export default AppProvider;




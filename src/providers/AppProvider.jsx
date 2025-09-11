import React from "react";

const StylesProvider = ({ children }) => <>{children}</>;
const RouterProvider = ({ children }) => <>{children}</>;
const I18nProvider = ({ children }) => <>{children}</>;
const ErrorBoundary = ({ children }) => <>{children}</>;

export default function AppProvider({ children }) {
    return (
        <ErrorBoundary>
            <I18nProvider>
                <StylesProvider>
                    <RouterProvider>
                        {children}
                    </RouterProvider>
                </StylesProvider>
            </I18nProvider>
        </ErrorBoundary>
    );
}

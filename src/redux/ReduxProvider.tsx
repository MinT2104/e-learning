'use client';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { ReactNode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

type Props = {
    children: ReactNode;
};

const ReduxProvider: React.FC<Props> = ({ children }) => {
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
};

export default ReduxProvider;

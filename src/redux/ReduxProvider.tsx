'use client';
import { Provider } from 'react-redux';
import store from './store';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const ReduxProvider: React.FC<Props> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
